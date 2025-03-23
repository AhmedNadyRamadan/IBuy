import { Injectable } from '@angular/core';
import type {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordMatchService {
  static ValidateConfirm(pass: string, confirm: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(pass)?.value;
      const confirmPassword = formGroup.get(confirm)?.value;
      if (password && confirmPassword && password !== confirmPassword) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }
}
