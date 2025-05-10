import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';

import { inject, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { authInterceptor } from './auth.interceptor';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { OKTA_AUTH } from '@okta/okta-angular';
import { oktaConfig } from './okta.config';

describe('AuthInterceptor', () => {

  const oktaAuthMock = {
    getAccessToken: () => 'letmein'
  }
  const authServiceSpy = vi.spyOn(oktaAuthMock, 'getAccessToken');

  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: OKTA_AUTH, useValue: oktaAuthMock }
      ]
    });
  });

  beforeEach(inject([HttpClient, HttpTestingController], (http: HttpClient, httpTestController: HttpTestingController) => {
    httpClient = http;
    httpMock = httpTestController;
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('adds the Authorization header when url is in allowed list', () => {
    httpClient.get(`${oktaConfig.issuer}`).subscribe({
      next: response => expect(response).toBeTruthy(),
      error: err => expect.fail(err)
    });

    expect(authServiceSpy).toHaveBeenCalledOnce()

    const httpReq = httpMock.expectOne(`${oktaConfig.issuer}`);
    expect(httpReq.request.headers.has('Authorization'));
    expect(httpReq.request.headers.get('Authorization')).toEqual('Bearer letmein');
    httpReq.flush({hello: 'world'});
    httpMock.verify();
  });

  it('skips the Authorization header when url is not in allowed list', () => {
    httpClient.get('fake').subscribe({
      next: response => expect(response).toBeTruthy(),
      error: err => expect.fail(err)
    });

    const httpReq = httpMock.expectOne('fake');
    expect(httpReq.request.headers.has('Authorization')).toBeFalsy();

    httpMock.verify();
  });
});
