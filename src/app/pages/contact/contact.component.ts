import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  formSubmitted = false;

  onSubmit() {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Here you would typically send the form data to your backend
      this.contactForm.reset();
      this.formSubmitted = false;
    }
  }
}
