import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningHeader } from './earning-header';

describe('EarningHeader', () => {
  let component: EarningHeader;
  let fixture: ComponentFixture<EarningHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
