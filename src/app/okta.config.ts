export type OktaConfig = {
  issuer: string,
  clientID: string
}

// Add your issuer and clientID here
export const oktaConfig: OktaConfig = {
  issuer: '{yourOktaDomain}',
  clientID: '{yourOktaClientID}'
}
