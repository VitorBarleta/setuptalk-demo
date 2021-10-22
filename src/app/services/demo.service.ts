import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Demo {
  message: string;
}

const resource: string = 'demo';

@Injectable()
export class DemoService {
  private _error$: Subject<any> = new Subject<any>();

  public error$: Observable<any> = this._error$.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  public get(): Observable<Demo> {
    return this.httpClient.get<Demo>('/demo').pipe(
      catchError((err, _) => {
        this._error$.next(err);
        return of({} as Demo);
      })
    );
  }
}
