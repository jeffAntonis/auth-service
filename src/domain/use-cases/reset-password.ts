import { KeyCloakUserApi } from '@/infra/gateways'

export type ResetPassword = (input: { id: string }) => Promise<void>

type Setup = (keyCloakUser: KeyCloakUserApi) => ResetPassword

export const setupKeyCloakResetPassword: Setup = (keyCloakUser) => async input => {
  return await keyCloakUser.resetPassword(input)
}
