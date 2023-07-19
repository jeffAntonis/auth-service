import { ResetPassword, setupKeyCloakResetPassword } from '@/domain/use-cases'
import { makeKeyCloakUserApi } from '@/main/factories/infra/gateways'

export const makeResetPassword = (): ResetPassword => {
  return setupKeyCloakResetPassword(
    makeKeyCloakUserApi()
  )
}
