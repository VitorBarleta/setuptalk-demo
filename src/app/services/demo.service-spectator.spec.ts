import { HttpErrorResponse } from '@angular/common/http';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { throwError } from 'rxjs';
import { DemoService } from './demo.service';

describe('DemoService', () => {
  let spectator: SpectatorHttp<DemoService>;
  let createService = createHttpFactory(DemoService);

  beforeEach(() => {
    spectator = createService();
  });

  it('should create service', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should call http get and return ok status code', () => {
    // act
    spectator.service.get().subscribe((resp) => {
      expect(resp).toEqual({ message: 'test' });
    });

    // expect
    spectator
      .expectOne('/demo', HttpMethod.GET)
      .flush({ message: 'test' });
  });

  it('should call http get and return an error', () => {
    // arrange
    const expectedHttpError = new HttpErrorResponse({
      error: 'Impossible fetch data',
      status: 500,
      statusText: 'Internal Server Error',
    });

    spectator.service.error$.subscribe(err => {
      expect(err).toBe(expectedHttpError);
    });

    // act
    spectator.service.get().subscribe();

    // expect
    spectator
      .expectOne('/demo', HttpMethod.GET)
      .flush(throwError(expectedHttpError));
  });
});
