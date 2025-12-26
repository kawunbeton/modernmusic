import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  // Гетери для зручного доступу в HTML
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.confirmPassword?.setErrors({ mismatch: true });
      return;
    }

    try {
      await this.authService.register(email, password);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Помилка реєстрації:', error);
      
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Цей email вже зареєстрований';
      } else if (error.code === 'auth/weak-password') {
        this.errorMessage = 'Пароль занадто слабкий';
      } else {
        this.errorMessage = 'Сталася помилка при реєстрації';
      }

      // Примусове оновлення
      this.cdr.detectChanges();
    }
  }
}