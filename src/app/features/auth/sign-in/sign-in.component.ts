import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  isSubmitting = false;
  private readonly REMEMBERED_EMAIL_KEY = 'rememberedEmail';

  constructor(private fb: FormBuilder, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Check for remembered email on component initialization
    const rememberedEmail = localStorage.getItem(this.REMEMBERED_EMAIL_KEY);
    if (rememberedEmail) {
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

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.isSubmitting = true;
      const { email, rememberMe } = this.signInForm.value;

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem(this.REMEMBERED_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(this.REMEMBERED_EMAIL_KEY);
      }

      // Simulate API call
      console.log('Form submitted:', this.signInForm.value);
      setTimeout(() => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard']);
      }, 1500);
    } else {
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