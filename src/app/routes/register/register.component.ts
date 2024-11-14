import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AuthorService } from '../../shared/author/author.service';

type NewUserForm = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  fullName: FormControl<string | null>;
  image: FormControl<string | null>;
}>;

@Component({
  selector: 'tweempus-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userAlreadyExists = false;
  newUserForm: NewUserForm;

  constructor(
    private authService: AuthService,
    private authorService: AuthorService,
    private formBuilder: FormBuilder
  ) {
    this.newUserForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        fullName: ['', [Validators.required]],
        image: ['', [this.urlValidator]],
      },
      { validators: this.matchValidator('password', 'confirmPassword') }
    );
  }

  matchValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['mustMatch']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { mustMatch: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }

  urlValidator(control: AbstractControl): ValidationErrors | null {
    let validUrl = true;

    if (!control.value) {
      return null;
    }

    try {
      new URL(control.value);
    } catch {
      validUrl = false;
    }

    return validUrl ? null : { invalidUrl: true };
  }

  register(form: NewUserForm) {
    if (this.userAlreadyExists) {
      this.userAlreadyExists = false;
    }

    const formEmail = form.value.email!;
    const formPassword = form.value.password!;
    const formFullName = form.value.fullName!;
    const formImage = form.value.image!;

    this.authorService.getAuthorByEmail(formEmail).subscribe({
      next: () => (this.userAlreadyExists = true),
      error: () => {
        this.authorService
          .setAuthor(formEmail, formPassword, formFullName, formImage)
          .subscribe({
            next: (author) => this.authService.login(author.id, author.image),
          });
      },
    });
  }
}
