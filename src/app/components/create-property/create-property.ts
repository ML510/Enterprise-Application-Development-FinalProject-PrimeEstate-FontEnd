import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyApiResponse } from '../../../Model/type';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-property.html',
  styleUrl: './create-property.css',
})
export class CreateProperty {

  constructor(private http: HttpClient) { }

  @Input() asModal = false;
  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  protected imagePreviewUrl: string | null = null;
  protected formErrorMessage = '';
  protected isSubmitting = false;
  protected isGenerating = false;
  
  protected property = {
    name: '',
    state: '',
    price: '',
    url: '',
    status: '',
    maxBedCount: '',
    minBedCount: '',
    sqft: '',
    dsc: '',
  };

  protected readonly stateOptions: string[] = [
    'Abu_Dhabi',
    'Dubai',
    'Sharjah',
    'Ajman',
    'Umm_Al_Quwain',
    'Ras_Al_Khaimah',
    'Fujairah',
  ];

  protected readonly statusOptions: string[] = ['off_plan', 'Ready'];

  protected onImagePicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.imagePreviewUrl = null;
      this.property.url = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      this.imagePreviewUrl = result;
      this.property.url = result;
    };
    reader.readAsDataURL(file);
  }

  protected submit(): void {
    if (this.isBusy()) {
      return;
    }

    this.formErrorMessage = '';

    if (!this.property.name || !this.property.state || !this.property.price || !this.property.url || !this.property.status || !this.property.maxBedCount || !this.property.minBedCount || !this.property.sqft || !this.property.dsc) {
      this.formErrorMessage = 'Please fill all required fields.';
      return;
    }

    const price = Number(this.property.price);
    const maxBedCount = Number(this.property.maxBedCount);
    const minBedCount = Number(this.property.minBedCount);
    const sqft = Number(this.property.sqft);

    if ([price, maxBedCount, minBedCount, sqft].some((value) => Number.isNaN(value))) {
      this.formErrorMessage = 'Please enter valid numeric values for price, beds, and sqft.';
      return;
    }

    const propertyPayload = {
      name: this.property.name.trim(),
      state: this.property.state,
      price,
      url: this.property.url,
      status: this.property.status,
      maxBedCount,
      minBedCount,
      sqft,
      dsc: this.property.dsc.trim(),
    };
    console.log('Create Property Payload:', propertyPayload);

    this.isSubmitting = true;

    this.http.post<PropertyApiResponse>('http://localhost:8080/api/property/add', propertyPayload).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log(response);
        this.formErrorMessage = '';
        this.router.navigate(['/d/listings']);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        console.error('Error creating property:', error);
        const backendMessage = typeof error.error === 'string'
          ? error.error
          : error.error?.message || error.message;
        this.formErrorMessage = `Create failed (${error.status}): ${backendMessage}`;
      }
    });
  }

  protected generateDescription(): void {
    if (this.isBusy()) {
      return;
    }

    this.formErrorMessage = '';

    const baseDescription = this.property.dsc.trim() || `${this.property.sqft}sqf ${this.property.maxBedCount} bed room ${this.property.state}`.trim();

    if (!baseDescription) {
      this.formErrorMessage = 'Enter some details first to generate description.';
      return;
    }

    const params = new HttpParams().set('description', baseDescription);

    this.isGenerating = true;
    this.cdr.detectChanges();

    this.http.get('http://localhost:8080/api/model/enhance', { params, responseType: 'text' }).subscribe({
      next: (response) => {
        this.isGenerating = false;
        let enhancedText = response;

        try {
          const parsed = JSON.parse(response) as { description?: string; data?: string; message?: string };
          enhancedText = parsed.description || parsed.data || parsed.message || response;
        } catch {
          // Keep plain text response as-is.
        }

        this.property.dsc = enhancedText.trim();
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.isGenerating = false;
        const backendMessage = typeof error.error === 'string'
          ? error.error
          : error.error?.message || error.message;
        this.formErrorMessage = `Generate failed (${error.status}): ${backendMessage}`;
        this.cdr.detectChanges();
      }
    });
  }

  protected isBusy(): boolean {
    return this.isSubmitting || this.isGenerating;
  }

  protected cancel(): void {
    if (this.asModal) {
      this.closed.emit();
      return;
    }

    this.router.navigate(['/d/dashboard']);
  }
}
