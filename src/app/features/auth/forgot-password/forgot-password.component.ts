import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [LoggerService],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  isEmailSent = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private logger: LoggerService
  ) {
    this.logger.debug('ForgotPasswordComponent initialized');
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isSubmitting = true;
      this.logger.info('Password reset requested', { email: this.forgotPasswordForm.value.email });
      
      // Here you would typically call your auth service
      console.log('Form submitted:', this.forgotPasswordForm.value);
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.isEmailSent = true;
        // Reset form
        this.forgotPasswordForm.reset();
      }, 1500);
    } else {
      this.logger.warn('Invalid form submission', this.forgotPasswordForm.errors);
      Object.keys(this.forgotPasswordForm.controls).forEach(key => {
        const control = this.forgotPasswordForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
} 