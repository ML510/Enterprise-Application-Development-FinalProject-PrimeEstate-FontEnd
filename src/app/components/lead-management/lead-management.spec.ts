import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { LeadManagement } from './lead-management';

describe('LeadManagement', () => {
  let component: LeadManagement;
  let fixture: ComponentFixture<LeadManagement>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadManagement],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LeadManagement);
    component = fixture.componentInstance;

    httpMock.expectOne('http://localhost:8080/api/lead/get').flush({
      success: true,
      message: 'ok',
      data: [],
    });

    httpMock.expectOne('http://localhost:8080/api/lead-stages/getAll').flush({
      success: true,
      message: 'ok',
      data: [],
    });

    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
