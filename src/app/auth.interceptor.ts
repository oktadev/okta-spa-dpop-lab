import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { oktaConfig } from './okta.config';

export const authInterceptor: HttpInterceptorFn = (req, next, oktaAuth = inject(OKTA_AUTH)) => {
  let request = req;
  const allowedOrigins = [`${oktaConfig.issuer}`];
  if (!allowedOrigins.find(origin => req.url.includes(origin))) return next(req);

  // Set Authorization header


  return next(request);
};
