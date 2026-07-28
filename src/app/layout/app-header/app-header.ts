import { Component } from '@angular/core';
import { AppRoutingModule } from "../../app.routes";

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [AppRoutingModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader {

}
