import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProperty } from '../../../components/create-property/create-property';
import { AlertPopup } from '../../../components/alert-popup/alert-popup';

@Component({
  selector: 'app-listings-header',
  imports: [CommonModule, CreateProperty, AlertPopup],
  templateUrl: './listings-header.html',
  styleUrl: './listings-header.css',
})
export class ListingsHeader {
  protected readonly showCreatePropertyModal = signal(false);

  protected openCreatePropertyModal(): void {
    this.showCreatePropertyModal.set(true);
  }

  protected closeCreatePropertyModal(): void {
    this.showCreatePropertyModal.set(false);
  }

  protected onPropertySaved(): void {
    this.closeCreatePropertyModal();
  }
}
