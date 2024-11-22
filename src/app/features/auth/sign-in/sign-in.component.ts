import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoggerService } from '../../../core/services/logger.service';
import { AuthService } from '@core/services/auth.service';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  
  authService = inject(AuthService);  
  signInForm: FormGroup;
  isSubmitting = false;
  private readonly REMEMBERED_EMAIL_KEY = 'rememberedEmail';

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private logger: LoggerService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    this.logger.debug('SignInComponent initialized');
    const rememberedEmail = localStorage.getItem(this.REMEMBERED_EMAIL_KEY);
    if (rememberedEmail) {
      this.logger.info('Found remembered email', { email: rememberedEmail });
      this.signInForm.patchValue({
        email: rememberedEmail,
        rememberMe: true
      });
    }

    // Listen to rememberMe changes
    this.signInForm.get('rememberMe')?.valueChanges.subscribe(checked => {
      if (!checked) {
        localStorage.removeItem(this.REMEMBERED_EMAIL_KEY);
      } else {
        const currentEmail = this.signInForm.get('email')?.value;
        if (currentEmail && this.signInForm.get('email')?.valid) {
          localStorage.setItem(this.REMEMBERED_EMAIL_KEY, currentEmail);
        }
      }
    });

    // Listen to email changes when rememberMe is checked
    this.signInForm.get('email')?.valueChanges.subscribe(email => {
      if (this.signInForm.get('rememberMe')?.value && this.signInForm.get('email')?.valid) {
        localStorage.setItem(this.REMEMBERED_EMAIL_KEY, email);
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.signInForm.valid) {
      this.isSubmitting = true;
      const { email, password, rememberMe } = this.signInForm.value;
      this.logger.info('Sign-in attempt', { email });

      if (rememberMe) {
        localStorage.setItem(this.REMEMBERED_EMAIL_KEY, email);
        this.logger.debug('Email remembered', { email });
      } else {
        localStorage.removeItem(this.REMEMBERED_EMAIL_KEY);
        this.logger.debug('Email forgotten');
      }

      // Simulate API call
      const userCredential = await this.authService.login(email, password);
      if (userCredential) {
        this.isSubmitting = false;
        this.logger.info('Sign-in successful', { email });
        this.router.navigate(['/account/dashboard']);
      }

      /*
      setTimeout(() => {
        this.isSubmitting = false;
        this.logger.info('Sign-in successful', { email });
        this.router.navigate(['/dashboard']);
      }, 1500);
      */
    } else {
      this.logger.warn('Invalid form submission', this.signInForm.errors);
      Object.keys(this.signInForm.controls).forEach(key => {
        const control = this.signInForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  // Helper method to clear remembered email
  clearRememberedEmail(): void {
    localStorage.removeItem(this.REMEMBERED_EMAIL_KEY);
    this.signInForm.patchValue({
      email: '',
      rememberMe: false
    });
  }
} 