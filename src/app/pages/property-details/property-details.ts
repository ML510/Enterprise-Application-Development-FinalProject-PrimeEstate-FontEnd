import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Property, PropertyApiResponse, SinglePropertyApiResponse } from '../../../Model/type';
import { NavBar } from "../../components/nav-bar/nav-bar";
import { Footer } from "../../components/footer/footer";
import { HttpClient } from '@angular/common/http';
import { ArrangeViewComponent } from '../../components/arrange-view/arrange-view';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NavBar, Footer, ArrangeViewComponent],
  templateUrl: './property-details.html',
  styleUrl: './property-details.css',
})
export class PropertyDetails implements OnInit {
  loading = true;
  isArrangeViewOpen = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  property: Property = {} as Property;

  similarProperties: Property[] = [];

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadPropertyDetails(id);
      } else {
        this.loading = false;
      }
    });
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  }

  loadPropertyDetails(id: string | number) {
    this.loading = true;
    this.http.get<SinglePropertyApiResponse>(`http://localhost:8080/api/property/get-by-id?id=${id}`).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.property = response.data;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading property:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.http.get<PropertyApiResponse>(`http://localhost:8080/api/property/get-related-collection`).subscribe({
      next: (response) => {
        this.similarProperties = response.data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading similar properties:', error);
        this.cdr.detectChanges();
      }
    });
  }

    scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  download() {
    this.http.get(`http://localhost:8080/api/files/download-pdf`, { responseType: 'blob' }).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `brochure-${this.property.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading brochure:', error);
      }
    });
  }

  whatsapp() {
    window.open('https://wa.me/message/GU66FORKVCWZP1', '_blank');
  }

  openArrangeView(): void {
    this.isArrangeViewOpen = true;
  }

  closeArrangeView(): void {
    this.isArrangeViewOpen = false;
  }
}