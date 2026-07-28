import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalandarHeader } from './calandar-header';

describe('CalandarHeader', () => {
  let component: CalandarHeader;
  let fixture: ComponentFixture<CalandarHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalandarHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalandarHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
