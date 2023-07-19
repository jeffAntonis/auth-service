import { SignOut, setupKeyCloakSignOut } from '@/domain/use-cases'
import { makeKeyCloakUserApi } from '@/main/factories/infra/gateways'

export const makeSignOut = (): SignOut => {
  return setupKeyCloakSignOut(
    makeKeyCloakUserApi()
  )
}
