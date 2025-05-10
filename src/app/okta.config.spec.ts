import { describe, it, expect } from 'vitest';

import { oktaConfig } from './okta.config';

describe('OktaConfig', () => {

  it('should be findable', () => {
    expect(oktaConfig).toBeTruthy();
  });

  it('should have a value for issuer', () => {
    expect(oktaConfig.issuer).toBeTruthy();
  });

  it('should have a value for clientID', () => {
    expect(oktaConfig.clientID).toBeTruthy();
  });

  it('should have a replaced value for issuer', () => {
    expect(oktaConfig.issuer).not.toEqual(`{yourOktaDomain}`);
  });

  it('should have a replaced value for clientID', () => {
    expect(oktaConfig.clientID).not.toEqual(`{yourOktaClientID}`);
  });

  it('should have a valid issuer', () => {
    expect(oktaConfig.issuer).toMatch(/https:\/\/[a-z0-9-]+.oktapreview.com/);
  });

});
