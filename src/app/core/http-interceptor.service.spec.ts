import { TestBed, inject } from '@angular/core/testing';

import { AppHttpInterceptor, HTTPStatus } from './http-interceptor.service';

describe('AppHttpInterceptor', () => {
  const httpStatusSpy = jasmine.createSpyObj('HTTPStatus', ['setHttpStatus']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppHttpInterceptor, HTTPStatus]
    });
  });

  it('should be created', inject([AppHttpInterceptor], (service: AppHttpInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
