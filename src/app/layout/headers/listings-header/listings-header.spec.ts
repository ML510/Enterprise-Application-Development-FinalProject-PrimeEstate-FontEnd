import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsHeader } from './listings-header';

describe('ListingsHeader', () => {
  let component: ListingsHeader;
  let fixture: ComponentFixture<ListingsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingsHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingsHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
