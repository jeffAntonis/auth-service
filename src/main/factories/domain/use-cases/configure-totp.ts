import { ConfigureTotp, setupKeyCloakConfigureTotp } from '@/domain/use-cases'
import { makeKeyCloakUserApi } from '@/main/factories/infra/gateways'

export const makeConfigureTotp = (): ConfigureTotp => {
  return setupKeyCloakConfigureTotp(
    makeKeyCloakUserApi()
  )
}
