import { KeyCloakAuthentication } from '../contracts/gateways'

export type Input = { email: string, password: string, totp?: string }
export type Output = {
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_expires_in: number
}

export type Authentication = (input: Input) => Promise<Output>

type Setup = (keyCloakAuthentication: KeyCloakAuthentication) => Authentication

export const setupKeyCloakAuthentication: Setup = (keyCloakAuthentication) => async input => {
  return await keyCloakAuthentication.authentication(input)
}
