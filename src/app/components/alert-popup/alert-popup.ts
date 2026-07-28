import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type AlertLevel = 'info' | 'success' | 'warning';

interface AlertItem {
  id: number;
  title: string;
  message: string;
  time: string;
  level: AlertLevel;
  read: boolean;
}

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.html',
  styleUrls: ['./alert-popup.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(keydown.escape)': 'close()'
  }
})
export class AlertPopup {
  readonly panelId = 'top-nav-alert-popup-panel';

  protected readonly isOpen = signal(false);
  protected readonly alerts = signal<AlertItem[]>([
    {
      id: 1,
      title: 'New inquiry received',
      message: 'A buyer requested more details for the Marina Bay listing.',
      time: '2m ago',
      level: 'info',
      read: false,
    },
    {
      id: 2,
      title: 'Lead marked hot',
      message: 'The Downtown Heights lead is ready for a follow-up call.',
      time: '18m ago',
      level: 'warning',
      read: false,
    },
    {
      id: 3,
      title: 'Listing published',
      message: 'Prime Villa was successfully published to the marketplace.',
      time: '1h ago',
      level: 'success',
      read: true,
    },
  ]);

  protected readonly unreadCount = computed(() => this.alerts().filter((alert) => !alert.read).length);

  toggle(): void {
    this.isOpen.update((value) => !value);
  }

  close(): void {
    this.isOpen.set(false);
  }

  markAsRead(alertId: number): void {
    this.alerts.update((alerts) =>
      alerts.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert))
    );
  }

  markAllAsRead(): void {
    this.alerts.update((alerts) => alerts.map((alert) => ({ ...alert, read: true })));
  }

  protected trackByAlertId(_: number, alert: AlertItem): number {
    return alert.id;
  }
}