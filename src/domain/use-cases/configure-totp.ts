import { KeyCloakUserApi } from '@/infra/gateways'

export type ConfigureTotp = (input: { id: string }) => Promise<void>

type Setup = (keyCloakUser: KeyCloakUserApi) => ConfigureTotp

export const setupKeyCloakConfigureTotp: Setup = (keyCloakUser) => async input => {
  return await keyCloakUser.configureTotp(input)
}
