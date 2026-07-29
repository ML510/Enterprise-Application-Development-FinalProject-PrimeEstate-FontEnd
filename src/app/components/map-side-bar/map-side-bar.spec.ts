import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSideBar } from './map-side-bar';

describe('MapSideBar', () => {
  let component: MapSideBar;
  let fixture: ComponentFixture<MapSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSideBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSideBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
