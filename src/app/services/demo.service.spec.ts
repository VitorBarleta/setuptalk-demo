import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Demo, DemoService } from './demo.service';

describe('DemoService', () => {
  let service: DemoService;

  beforeEach(() => {
    service = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DemoService],
    }).inject(DemoService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should call http get and return ok status code', () => {
    // arrange
    const httpGet = spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(
      of({ message: 'test' } as Demo)
    );

    // act
    service.get().subscribe((resp) => {
      expect(resp).toEqual({ message: 'test' });
    });

    // expect
    expect(httpGet).toHaveBeenCalledWith('/demo');
  });

  it('should call http get and return an error', () => {
    // arrange
    const expectedHttpError = new HttpErrorResponse({
      error: 'Impossible fetch data',
      status: 500,
      statusText: 'Internal Server Error',
    });

    const httpGet = spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(
      throwError(expectedHttpError)
    );

    service.error$.subscribe((err: HttpErrorResponse) => {
      expect(err).toBe(expectedHttpError);
    });

    // act
    service.get().subscribe();

    // expect
    expect(httpGet).toHaveBeenCalledWith('/demo');
  });
});
