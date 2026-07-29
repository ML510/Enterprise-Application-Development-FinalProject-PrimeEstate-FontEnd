import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calandar } from './calandar';

describe('Calandar', () => {
  let component: Calandar;
  let fixture: ComponentFixture<Calandar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Calandar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Calandar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
