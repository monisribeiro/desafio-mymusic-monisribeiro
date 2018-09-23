import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { finalize, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }
  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }
  getHttpStatus() {
    return this.requestInFlight$.asObservable();
  }
}



@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private status: HTTPStatus) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map(event => {
        this.status.setHttpStatus(true);
        return event;
      }),
      finalize(() => {
        this.status.setHttpStatus(false);
      })
    );
  }
}
