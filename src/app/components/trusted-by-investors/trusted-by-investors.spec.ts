import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedByInvestors } from './trusted-by-investors';

describe('TrustedByInvestors', () => {
  let component: TrustedByInvestors;
  let fixture: ComponentFixture<TrustedByInvestors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustedByInvestors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustedByInvestors);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
