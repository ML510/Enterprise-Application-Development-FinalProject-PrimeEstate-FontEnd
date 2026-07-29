import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { Listings } from './listings';

describe('Listings', () => {
  let component: Listings;
  let fixture: ComponentFixture<Listings>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listings],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Listings);
    component = fixture.componentInstance;

    const request = httpMock.expectOne((httpRequest) =>
      httpRequest.url === 'http://localhost:8080/api/property/get' &&
      httpRequest.params.get('page') === '0' &&
      httpRequest.params.get('size') === '4' &&
      httpRequest.params.get('direction') === 'desc'
    );

    request.flush({
      success: true,
      message: '',
      data: {
        pageNumber: 0,
        pageSize: 4,
        sortBy: 'name',
        sortDirection: 'desc',
        totalElements: 1,
        totalPages: 1,
        last: true,
        content: []
      },
      timestamp: new Date().toISOString()
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the first page request on init', () => {
    expect((component as unknown as { currentPage: { (): number } }).currentPage()).toBe(0);
  });
});
