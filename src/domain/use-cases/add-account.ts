import { KeyCloakUserApi } from '@/infra/gateways'
import { User } from '@/domain/entities'

export type AddAccount = (input: User) => Promise<void>

type Setup = (keyCloakUser: KeyCloakUserApi) => AddAccount

export const setupKeyCloakAddAccount: Setup = (keyCloakUser) => async input => {
  return await keyCloakUser.create(input)
}
