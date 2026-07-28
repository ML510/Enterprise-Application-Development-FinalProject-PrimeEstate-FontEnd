import { Injectable, signal } from '@angular/core';

export interface PropertySearchFilters {
  name: string;
  state: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class PropertySearchState {
  readonly filters = signal<PropertySearchFilters | null>(null);

  setFilters(filters: PropertySearchFilters): void {
    this.filters.set(filters);
  }

  clear(): void {
    this.filters.set(null);
  }
}
