import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { oktaConfig } from './okta.config';

const oktaAuth = new OktaAuth({
  issuer: oktaConfig.issuer,
  clientId: oktaConfig.clientID,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'offline_access', 'okta.users.read', 'okta.apps.read'],

});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      OktaAuthModule.forRoot({ oktaAuth })
    ),
    provideHttpClient(withInterceptors([
      authInterceptor
    ])),
  ]
};
