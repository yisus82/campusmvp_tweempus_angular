import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { TweempService } from '../../shared/tweemp/tweemp.service';

type NewTweempForm = FormGroup<{
  content: FormControl<string | null>;
}>;

@Component({
  selector: 'tweempus-create-tweemp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-tweemp.component.html',
  styleUrl: './create-tweemp.component.css',
})
export class CreateTweempComponent {
  newTweempForm: NewTweempForm;

  constructor(
    private authService: AuthService,
    private tweempService: TweempService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.newTweempForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(140)]],
    });
  }

  createTweemp(form: NewTweempForm) {
    const loggedAuthorId = this.authService.token!.authorId;
    const formContent = form.value.content!;

    this.tweempService.setTweemp(loggedAuthorId, formContent).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
