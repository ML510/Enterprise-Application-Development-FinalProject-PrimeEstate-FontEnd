import { Component } from '@angular/core';
import { DashboardHero } from "../../components/dashboard-hero/dashboard-hero";

@Component({
  selector: 'app-dashboard',
  imports: [DashboardHero],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
