import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../../components/side-bar/side-bar';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterOutlet, SideBar],
  templateUrl: './app-layout.html',
  styleUrls: ['./app-layout.css'],
})
export class AppLayout {

}
