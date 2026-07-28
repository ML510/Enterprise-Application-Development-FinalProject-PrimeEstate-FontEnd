import { Component, ElementRef, ViewChild } from '@angular/core';
import { PropertySearchState } from '../../state/property-search.state';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  @ViewChild('heroImage') heroImage!: ElementRef<HTMLImageElement>;
  searchName = '';
  searchState = '';
  searchPrice = '50000000';

  constructor(private readonly propertySearchState: PropertySearchState) {}

  ngAfterViewInit(): void {
    // Example: make sure it always covers parent
    const img = this.heroImage.nativeElement;
    img.style.objectFit = 'cover';
    img.style.width = '100%';
    img.style.height = '100%';
  }

  onSearch(): void {
    const name = this.searchName.trim();
    const state = this.searchState.trim();
    const rawPrice = this.searchPrice.trim();
    const parsedPrice = !rawPrice || rawPrice === 'any' ? 0 : Number.parseInt(rawPrice, 10);

    this.propertySearchState.setFilters({
      name,
      state,
      price: Number.isNaN(parsedPrice) ? 0 : parsedPrice,
    });
  }
}
