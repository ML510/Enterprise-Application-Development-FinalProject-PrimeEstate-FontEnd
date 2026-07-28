import { Component } from '@angular/core';
import { MapSideBar } from "../../components/map-side-bar/map-side-bar";
import { RouterOutlet } from '@angular/router';
import { Map } from "../../pages/map/map";

@Component({
  selector: 'app-map-layout',
  standalone: true,
  imports: [MapSideBar],
  templateUrl: './map-layout.html',
  styleUrls: ['./map-layout.css'],
})
export class MapLayout {

}
