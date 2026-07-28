import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCollections } from './featured-collections';

describe('FeaturedCollections', () => {
  let component: FeaturedCollections;
  let fixture: ComponentFixture<FeaturedCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedCollections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedCollections);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
