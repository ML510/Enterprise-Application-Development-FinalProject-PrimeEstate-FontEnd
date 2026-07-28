import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadMHeader } from './lead-m-header';

describe('LeadMHeader', () => {
  let component: LeadMHeader;
  let fixture: ComponentFixture<LeadMHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadMHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadMHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
