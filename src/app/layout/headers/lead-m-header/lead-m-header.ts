import { Component, signal } from '@angular/core';
import { CreateLead } from '../../../components/create-lead/create-lead';

@Component({
  selector: 'app-lead-m-header',
  imports: [CreateLead],
  templateUrl: './lead-m-header.html',
  styleUrl: './lead-m-header.css',
})
export class LeadMHeader {
  protected readonly showCreateLeadModal = signal(false);

  protected openCreateLeadModal(): void {
    this.showCreateLeadModal.set(true);
  }

  protected closeCreateLeadModal(): void {
    this.showCreateLeadModal.set(false);
  }

  protected onLeadSaved(): void {
    this.closeCreateLeadModal();
  }

}
