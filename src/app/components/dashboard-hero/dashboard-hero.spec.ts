import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHero } from './dashboard-hero';

describe('DashboardHero', () => {
  let component: DashboardHero;
  let fixture: ComponentFixture<DashboardHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
