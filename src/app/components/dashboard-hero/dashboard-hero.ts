import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { CreateProperty } from '../create-property/create-property';
import { CreateLead } from '../create-lead/create-lead';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Viewing } from '../../../Model/type';

@Component({
  selector: 'app-dashboard-hero',
  imports: [NgIf, CreateProperty, CreateLead, NgForOf],
  templateUrl: './dashboard-hero.html',
  styleUrl: './dashboard-hero.css',
})
export class DashboardHero implements OnInit{

  constructor(private http: HttpClient,private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadCounts();
  }

  propertyCount = 0;
  leadsCount = 0;
  recentInquiries: Viewing[] = [];

  protected isCreatePropertyOpen = false;
  protected isCreateLeadOpen = false;

  protected openNewListing(): void {
    this.isCreatePropertyOpen = true;
  }

  protected closeCreatePropertyModal(): void {
    this.isCreatePropertyOpen = false;
  }

  protected openAddLead(): void {
    this.isCreateLeadOpen = true;
  }

  protected closeCreateLeadModal(): void {
    this.isCreateLeadOpen = false;
  }

  loadCounts(): void {
    this.http.get<ApiResponse>('http://localhost:8080/api/lead/get-count').subscribe({
      next: (response) => {
        this.leadsCount = response.data || 0;
        this.cdr.detectChanges();
        },
      error: (error) => {
        console.error('Error loading counts', error);
      }
    });
    this.http.get<ApiResponse>('http://localhost:8080/api/property/get-count').subscribe({
      next: (response) => {        
        this.propertyCount = response.data || 0;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading active listings count', error);
      }
    });
    this.http.get<ApiResponse>('http://localhost:8080/api/viewings/get-last-two').subscribe({
      next: (response) => {
        console.log(response);
        
        this.recentInquiries = response.data || [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading recent inquiries', error);
      }
    });
  }


  call(phone: string): void {
    window.location.href = `tel:${phone}`;
  }
  mail(email: string): void {
    window.location.href = `mailto:${email}`;
  }
}
