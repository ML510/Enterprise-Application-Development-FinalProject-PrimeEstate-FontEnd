import { Component } from '@angular/core';
import { AlertPopup } from "../../../components/alert-popup/alert-popup";

@Component({
  selector: 'app-dashboard-header',
  imports: [AlertPopup],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css',
})
export class DashboardHeader {
  protected readonly currentDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date());

}
