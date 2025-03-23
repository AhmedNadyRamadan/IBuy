import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { PasswordMatchService } from '../services/customValidators/password-match.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form: FormGroup;
  isSubmit: boolean = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.pattern('.+@[a-zA-Z]{2,}.com')],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('[a-zA-Z0-9]{3,}'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: PasswordMatchService.ValidateConfirm(
          'password',
          'confirmPassword'
        ),
      }
    );
  }
  get formCtr() {
    return this.form.controls;
  }
  handleSubmit() {
    this.isSubmit = true;
    if (this.form.valid) {
      alert('submitted');
    }
  }
}
