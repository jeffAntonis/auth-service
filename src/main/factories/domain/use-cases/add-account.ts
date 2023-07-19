import { AddAccount, setupKeyCloakAddAccount } from '@/domain/use-cases'
import { makeKeyCloakUserApi } from '@/main/factories/infra/gateways'

export const makeAddAccount = (): AddAccount => {
  return setupKeyCloakAddAccount(
    makeKeyCloakUserApi()
  )
}
