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
    expect(oktaConfig.issuer).not.toContain('}');
  });

  it('should have a replaced value for clientID', () => {
    expect(oktaConfig.clientID).not.toEqual(`{yourOktaClientID}`);
    expect(oktaConfig.clientID).not.toContain('}');
  });

  it('should have a valid issuer', () => {
    expect(oktaConfig.issuer).toMatch(/https:\/\/[a-z0-9-]+.oktapreview.com/);
    expect(oktaConfig.issuer).not.toContain('-admin.oktapreview.com');
  });

});
