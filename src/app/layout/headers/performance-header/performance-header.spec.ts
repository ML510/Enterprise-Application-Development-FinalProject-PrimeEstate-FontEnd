import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceHeader } from './performance-header';

describe('PerformanceHeader', () => {
  let component: PerformanceHeader;
  let fixture: ComponentFixture<PerformanceHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
