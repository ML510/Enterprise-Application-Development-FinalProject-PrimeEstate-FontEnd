import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginatedPropertyApiResponse, Property } from '../../../Model/type';

@Component({
  selector: 'app-listings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
  templateUrl: './listings.html',
  styleUrl: './listings.css',
})
export class Listings {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/property/get';
  private readonly pageSize = 4;

  protected readonly properties = signal<Property[]>([]);
  protected readonly currentPage = signal(0);
  protected readonly totalPages = signal(0);
  protected readonly totalElements = signal(0);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly hasPreviousPage = computed(() => this.currentPage() > 0);
  protected readonly hasNextPage = computed(() => this.currentPage() + 1 < this.totalPages());
  protected readonly pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, index) => index));
  protected readonly pageSummary = computed(() => {
    if (this.totalElements() === 0) {
      return 'No properties found';
    }

    const start = this.currentPage() * this.pageSize + 1;
    const end = Math.min(start + this.properties().length - 1, this.totalElements());
    return `Showing ${start}-${end} of ${this.totalElements()} properties`;
  });

  constructor() {
    this.loadPage(0);
  }

  protected loadPage(page: number): void {
    if (page < 0 || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const params = new HttpParams()
      .set('page', page)
      .set('size', this.pageSize)
      .set('direction', 'desc');

    this.http.get<PaginatedPropertyApiResponse>(this.apiUrl, { params }).subscribe({
      next: (response) => {
        console.log('Properties response:', response);
        const data = response.data;
        this.properties.set(data.content ?? []);
        this.currentPage.set(data.pageNumber ?? page);
        this.totalPages.set(data.totalPages ?? 0);
        this.totalElements.set(data.totalElements ?? 0);
        this.loading.set(false);
        console.log('Properties loaded:', this.properties());
      },
      error: (err) => {
        console.error('Error loading properties:', err);
        this.loading.set(false);
        this.errorMessage.set('Unable to load properties right now. Please try again.');
      }
    });
  }

  protected previousPage(): void {
    if (this.hasPreviousPage()) {
      this.loadPage(this.currentPage() - 1);
    }
  }

  protected nextPage(): void {
    if (this.hasNextPage()) {
      this.loadPage(this.currentPage() + 1);
    }
  }

  protected goToPage(page: number): void {
    if (page !== this.currentPage()) {
      this.loadPage(page);
    }
  }

  protected formatPrice(price: number): string {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 0,
    }).format(price);
  }

  protected formatSquareFeet(squareFeet: number): string {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(squareFeet);
  }

  protected statusLabel(status: string): string {
    return status.replaceAll('_', ' ');
  }

}
