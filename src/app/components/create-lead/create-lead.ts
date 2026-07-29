import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Lead } from '../../../Model/type';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-lead',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-lead.html',
  styleUrl: './create-lead.css',
})
export class CreateLead {
  @Input() asModal = false;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
  protected submitAttempted = false;
  protected formErrorMessage = '';
  
  lead:Lead = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    lastContact: new Date(),
    stage: 'NEW',
    profilePic: '',
  };

  private readonly router = inject(Router);
  private http = inject(HttpClient);

  protected readonly profilePreviewUrl = signal<string | null>(null);
  protected readonly stageOptions = ['NEW', 'CONTACTED', 'QUALIFIED', 'NEGOTIATION', 'CLOSED'];

  protected onProfilePicked(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const file = inputEl.files?.[0];

    if (!file) {
      this.profilePreviewUrl.set(null);
      this.lead.profilePic = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      this.profilePreviewUrl.set(result);
      this.lead.profilePic = "sample-profile-pic.jpg";
    };
    reader.readAsDataURL(file);
  }

  protected submit(): void {
    this.submitAttempted = true;
    this.formErrorMessage = '';

    if (!this.isLeadValid()) {
      this.formErrorMessage = 'Please fix the highlighted fields.';
      return;
    }

    this.http.post('http://localhost:8080/api/lead/add', this.lead).subscribe({
      next: (response) => {
        console.log(response);
        this.formErrorMessage = '';

        if (this.asModal) {
          this.saved.emit();
          this.closed.emit();
          return;
        }

        this.router.navigate(['/d/leads']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error creating lead:', error);
        const backendMessage = typeof error.error === 'string'
          ? error.error
          : error.error?.message || error.message;
        this.formErrorMessage = `Create failed (${error.status}): ${backendMessage}`;
      }
    });

  }

  protected cancel(): void {
    if (this.asModal) {
      this.closed.emit();
      return;
    }

    this.router.navigate(['/d/dashboard']);
  }

  protected hasNameError(): boolean {
    return this.submitAttempted && !this.lead.name.trim();
  }

  protected hasEmailError(): boolean {
    if (!this.submitAttempted) {
      return false;
    }

    const email = this.lead.email.trim();
    return !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  protected hasPhoneError(): boolean {
    if (!this.submitAttempted) {
      return false;
    }

    const phone = this.lead.phone.trim();
    return !phone || !/^\+?[0-9\s\-()]{7,20}$/.test(phone);
  }

  protected hasStageError(): boolean {
    return this.submitAttempted && !this.lead.stage;
  }

  protected hasProfilePicError(): boolean {
    return this.submitAttempted && !this.lead.profilePic;
  }

  private isLeadValid(): boolean {
    return !this.hasNameError() && !this.hasEmailError() && !this.hasPhoneError() && !this.hasStageError() && !this.hasProfilePicError();
  }
}
