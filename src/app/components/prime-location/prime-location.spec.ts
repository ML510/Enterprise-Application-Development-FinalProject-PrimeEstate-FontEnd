import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeLocation } from './prime-location';

describe('PrimeLocation', () => {
  let component: PrimeLocation;
  let fixture: ComponentFixture<PrimeLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeLocation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
