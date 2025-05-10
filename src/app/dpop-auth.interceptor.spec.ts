import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';

import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { authInterceptor } from './auth.interceptor';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { OKTA_AUTH } from '@okta/okta-angular';
import { oktaConfig } from './okta.config';
import { firstValueFrom } from 'rxjs';

describe('DPoP AuthInterceptor', () => {
  const oktaAuthMock = {
    getAccessToken: () => 'nope!',
    getDPoPAuthorizationHeaders: () => Promise.resolve({
      Authorization: 'letmein',
      Dpop: 'the proof!'
    })
  }
  const authServiceSpy = vi.spyOn(oktaAuthMock, 'getDPoPAuthorizationHeaders');

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

  it('calls Okta Auth service to get the DPoP headers', async () => {
    firstValueFrom(httpClient.get(`${oktaConfig.issuer}`));
    expect(await authServiceSpy).toHaveBeenCalledExactlyOnceWith({url: `${oktaConfig.issuer}/`, method: 'GET'});

    const httpReq = httpMock.expectOne(`${oktaConfig.issuer}`);
    expect(httpReq.request.headers.has('Authorization'));
    expect(httpReq.request.headers.has('DPoP'));
    httpReq.flush({})
  });
});
