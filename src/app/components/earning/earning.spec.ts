import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Earning } from './earning';

describe('Earning', () => {
  let component: Earning;
  let fixture: ComponentFixture<Earning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Earning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Earning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
