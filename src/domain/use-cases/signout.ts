import { KeyCloakSignOut } from '@/domain/contracts/gateways'

type Input = { userId: string }
type Output = any

export type SignOut = (input: Input) => Promise<Output>

type Setup = (keyCloakSignOut: KeyCloakSignOut) => SignOut

export const setupKeyCloakSignOut: Setup = (keyCloakSignOut) => async input => {
  return await keyCloakSignOut.signOut(input)
}
