import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';
import { AuthorService } from '../../shared/author/author.service';

type UserForm = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}>;

@Component({
  selector: 'tweempus-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  invalidCredentials = false;
  userForm: UserForm;

  constructor(
    private authService: AuthService,
    private authorService: AuthorService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(form: UserForm) {
    if (this.invalidCredentials) {
      this.invalidCredentials = false;
    }

    const formEmail = form.value.email!;
    const formPassword = form.value.password!;

    this.authorService
      .getAuthorByEmailAndPassword(formEmail, formPassword)
      .subscribe({
        next: (author) => {
          this.authService.login(author.id, author.image);
        },
        error: () => {
          this.invalidCredentials = true;
        },
      });
  }
}
