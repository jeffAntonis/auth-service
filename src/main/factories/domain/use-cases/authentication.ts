import { Authentication, setupKeyCloakAuthentication } from '@/domain/use-cases'
import { makeKeyCloakUserApi } from '@/main/factories/infra/gateways'

export const makeAuthentication = (): Authentication => {
  return setupKeyCloakAuthentication(
    makeKeyCloakUserApi()
  )
}
