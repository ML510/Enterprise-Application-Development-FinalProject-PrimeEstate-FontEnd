import { ChangeDetectorRef, Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyApiResponse } from '../../../Model/type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { PropertySearchState } from '../../state/property-search.state';

@Component({
  selector: 'app-featured-collections',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './featured-collections.html',
  styleUrl: './featured-collections.css',
})
export class FeaturedCollections implements OnInit {
  private readonly propertySearchState = inject(PropertySearchState);
  selectedFilter: 'all' | 'off_plan' | 'ready' = 'all';
  private readonly favoriteIds = new Set<number>();
  protected lastAnimatedFavoriteId: number | null = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
    effect(() => {
      const filters = this.propertySearchState.filters();
      if (!filters) {
        return;
      }

      this.loadSearchCollections(filters.name, filters.state, filters.price);
    });
  }
  ngOnInit(): void {
    this.loadCollections();
  }

  apiresponse: PropertyApiResponse = {
    success: false,
    message: '',
    data: [],
    timestamp: new Date(),
  }


  loadCollections(): void {
    this.selectedFilter = 'all';
    this.http.get<PropertyApiResponse>('http://localhost:8080/api/property/get-all').subscribe({
      next: (response) => {
        this.apiresponse = response;
        this.cdr.detectChanges();
      }
    });
  }

  loadSearchCollections(name: string, state: string, price: number): void {
    this.selectedFilter = 'all';
    const params = new HttpParams()
      .set('name', name)
      .set('state', state)
      .set('price', price);

    this.http.get<PropertyApiResponse>('http://localhost:8080/api/property/search', { params }).subscribe({
      next: (response) => {
        this.apiresponse = response;
        this.cdr.detectChanges();
      }
    });
  }

  loadOffPlanCollections() {
    this.selectedFilter = 'off_plan';
    this.http.get<PropertyApiResponse>('http://localhost:8080/api/property/get-by-status/off_plan').subscribe({
      next: (response) => {
        this.apiresponse = response;
        this.cdr.detectChanges();
      }
    });
    this.cdr.detectChanges();
  }

  loadReadyCollections() {
    this.selectedFilter = 'ready';
    this.http.get<PropertyApiResponse>('http://localhost:8080/api/property/get-by-status/Ready').subscribe({
      next: (response) => {
        this.apiresponse = response;
        this.cdr.detectChanges();
      }
    });
    this.cdr.detectChanges();
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }

  protected fav(id: number): void {
    if (this.favoriteIds.has(id)) {
      this.favoriteIds.delete(id);
    } else {
      this.favoriteIds.add(id);
    }

    this.lastAnimatedFavoriteId = id;
    setTimeout(() => {
      if (this.lastAnimatedFavoriteId === id) {
        this.lastAnimatedFavoriteId = null;
      }
    }, 300);
  }

  protected isFavorite(id: number): boolean {
    return this.favoriteIds.has(id);
  }
}
