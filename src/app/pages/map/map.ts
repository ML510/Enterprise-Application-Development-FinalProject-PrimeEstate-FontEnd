import { AfterViewInit, Component } from '@angular/core';

// Add this line to declare 'google' as a global variable
declare const google: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.html',
  styleUrls: ['./map.css'],
})
export class Map implements AfterViewInit {

  ngAfterViewInit() {
    // Check that 'google' is loaded in index.html
    const map = new google.maps.Map(document.getElementById('map')!, {
      center: { lat: 25.2048, lng: 55.2708 }, // Dubai coordinates
      zoom: 12
    });
  }

}
