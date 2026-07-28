import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-arrange-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './arrange-view.html',
  styleUrl: './arrange-view.css',
})
export class ArrangeViewComponent {

    constructor(private http: HttpClient,private cdr: ChangeDetectorRef) { }

  @Input() propertyName = '';
  @Output() closed = new EventEmitter<void>();

  protected formErrorMessage = '';
  protected successMessage = '';
  protected showSuccessPopup = false;
  protected submitAttempted = false;
  protected isSubmitting = false;

  protected viewing = {
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '00:00:00',
    note: '',
  };

  protected submit(): void {
    if (this.isSubmitting) {
      return;
    }

    this.submitAttempted = true;
    this.formErrorMessage = '';
    this.successMessage = '';

    if (!this.viewing.fullName || !this.viewing.email || !this.viewing.phone || !this.viewing.preferredDate || !this.viewing.preferredTime) {
      this.formErrorMessage = 'Please fill all required fields.';
      return;
    }

    if (this.hasEmailError()) {
      this.formErrorMessage = 'Please enter a valid email address.';
      return;
    }

    if (this.hasPhoneError()) {
      this.formErrorMessage = 'Please enter a valid phone number.';
      return;
    }

    const requestPayload = {
      name: this.viewing.fullName.trim(),
      email: this.viewing.email.trim(),
      phone: this.viewing.phone.trim(),
      viewingDate: this.viewing.preferredDate,
      time: this.normalizeTime(this.viewing.preferredTime),
      note: this.viewing.note.trim(),
    };

    this.isSubmitting = true;

    this.http.post('http://localhost:8080/api/viewings/add', requestPayload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.formErrorMessage = '';
        this.successMessage = 'Viewing request sent successfully. Our advisor will contact you soon.';
        this.showSuccessPopup = true;
        this.cdr.detectChanges();
        
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error submitting viewing request:', error);
        this.isSubmitting = false;
        const backendMessage = typeof error.error === 'string'
          ? error.error
          : error.error?.message || error.message;
        this.formErrorMessage = `Request failed (${error.status}): ${backendMessage}`;
        this.cdr.detectChanges();
      }
    });
  }

  protected hasEmailError(): boolean {
    if (!this.submitAttempted) {
      return false;
    }

    const email = this.viewing.email.trim();
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  protected hasPhoneError(): boolean {
    if (!this.submitAttempted) {
      return false;
    }

    const phone = this.viewing.phone.trim();
    return !/^\+?[0-9\s\-()]{7,20}$/.test(phone);
  }

  private normalizeTime(value: string): string {
    const time = value.trim();

    if (!time) {
      return '00:00:00';
    }

    if (/^\d{2}:\d{2}:\d{2}$/.test(time)) {
      return time;
    }

    if (/^\d{2}:\d{2}$/.test(time)) {
      return `${time}:00`;
    }

    return '00:00:00';
  }

  protected close(): void {
    if (this.isSubmitting) {
      return;
    }
    this.closed.emit();
  }

  protected closeSuccessPopup(): void {
    this.showSuccessPopup = false;
    this.closed.emit();
  }
}
