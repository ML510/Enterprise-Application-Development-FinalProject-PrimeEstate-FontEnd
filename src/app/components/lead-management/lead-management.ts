import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Lead } from '../../../Model/type';

interface LeadApiResponse {
  success: boolean;
  message: string;
  data: Lead[];
}

interface LeadStage {
  id: number;
  name: string;
  createdDate: string | null;
  description: string;
}

interface LeadStageApiResponse {
  success: boolean;
  message: string;
  data: LeadStage[];
}

interface StagePalette {
  dot: string;
  badgeBackground: string;
  badgeText: string;
}

interface LeadStageColumn {
  id: number;
  name: string;
  leads: Lead[];
  palette: StagePalette;
}

@Component({
  selector: 'app-lead-management',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './lead-management.html',
  styleUrl: './lead-management.css',
})
export class LeadManagement {
  private readonly http = inject(HttpClient);
  private readonly leadsUrl = 'http://localhost:8080/api/lead/get';
  private readonly stagesUrl = 'http://localhost:8080/api/lead-stages/getAll';

  private readonly stagePalette: StagePalette[] = [
    { dot: '#0ea5e9', badgeBackground: '#e0f2fe', badgeText: '#0369a1' },
    { dot: '#10b981', badgeBackground: '#dcfce7', badgeText: '#047857' },
    { dot: '#f59e0b', badgeBackground: '#fef3c7', badgeText: '#b45309' },
    { dot: '#8b5cf6', badgeBackground: '#ede9fe', badgeText: '#6d28d9' },
    { dot: '#ef4444', badgeBackground: '#fee2e2', badgeText: '#b91c1c' },
    { dot: '#64748b', badgeBackground: '#e2e8f0', badgeText: '#334155' },
  ];

  protected readonly leads = signal<Lead[]>([]);
  protected readonly stages = signal<LeadStage[]>([]);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly stageColumns = computed<LeadStageColumn[]>(() => {
    const leads = this.leads();
    const stages = this.stages();

    if (stages.length === 0 && leads.length === 0) {
      return [];
    }

    const groupedLeads = new Map<string, Lead[]>();
    for (const lead of leads) {
      const key = this.normalizeStageName(lead.stage);
      if (!groupedLeads.has(key)) {
        groupedLeads.set(key, []);
      }
      groupedLeads.get(key)?.push(lead);
    }

    const knownStageKeys = new Set<string>();
    const columns: LeadStageColumn[] = [];

    if (stages.length > 0) {
      for (let index = 0; index < stages.length; index += 1) {
        const stage = stages[index];
        const key = this.normalizeStageName(stage.name);
        knownStageKeys.add(key);
        columns.push({
          id: stage.id,
          name: this.toDisplayStageName(stage.name),
          leads: groupedLeads.get(key) ?? [],
          palette: this.resolvePalette(index),
        });
      }
    } else {
      const fallbackStageNames = Array.from(
        new Set(leads.map((lead) => this.toDisplayStageName(lead.stage)))
      );

      for (let index = 0; index < fallbackStageNames.length; index += 1) {
        const stageName = fallbackStageNames[index];
        const key = this.normalizeStageName(stageName);
        knownStageKeys.add(key);
        columns.push({
          id: index + 1,
          name: stageName,
          leads: groupedLeads.get(key) ?? [],
          palette: this.resolvePalette(index),
        });
      }
    }

    const unmatchedLeads = leads.filter((lead) => !knownStageKeys.has(this.normalizeStageName(lead.stage)));
    if (unmatchedLeads.length > 0) {
      columns.push({
        id: 999_999,
        name: 'Unassigned',
        leads: unmatchedLeads,
        palette: this.resolvePalette(columns.length),
      });
    }

    return columns;
  });

  constructor() {
    this.loadLeadBoard();
  }

  protected loadLeadBoard(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    forkJoin({
      leadsResponse: this.http.get<LeadApiResponse>(this.leadsUrl),
      stagesResponse: this.http.get<LeadStageApiResponse>(this.stagesUrl),
    }).subscribe({
      next: ({ leadsResponse, stagesResponse }) => {
        this.leads.set(leadsResponse.data ?? []);
        this.stages.set(stagesResponse.data ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Unable to load leads and stages right now. Please try again.');
      },
    });
  }

  protected trackStage(_: number, column: LeadStageColumn): number {
    return column.id;
  }

  protected trackLead(_: number, lead: Lead): number {
    return lead.id;
  }

  protected getInitials(name: string): string {
    return name
      .split(' ')
      .filter((part) => part.length > 0)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  protected formatLastContact(lastContact: Date | string | null): string {
    if (!lastContact) {
      return 'None';
    }

    const date = new Date(lastContact);
    if (Number.isNaN(date.getTime())) {
      return 'None';
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  private normalizeStageName(stageName: string | null | undefined): string {
    return (stageName ?? '').trim().toLowerCase();
  }

  private toDisplayStageName(stageName: string | null | undefined): string {
    const trimmed = (stageName ?? '').trim();
    if (!trimmed) {
      return 'Unassigned';
    }

    return trimmed
      .split(/[_\s]+/)
      .filter((segment) => segment.length > 0)
      .map((segment) => segment[0].toUpperCase() + segment.slice(1).toLowerCase())
      .join(' ');
  }

  private resolvePalette(index: number): StagePalette {
    return this.stagePalette[index % this.stagePalette.length];
  }

}
