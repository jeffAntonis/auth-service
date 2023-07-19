import { env } from '@/main/config/env'
import { makeAxiosHttpClient } from '@/main/factories/infra/gateways'
import { KeyCloakUserApi } from '@/infra/gateways'

export const makeKeyCloakUserApi = (): KeyCloakUserApi => {
  return new KeyCloakUserApi(
    makeAxiosHttpClient(),
    env.keycloak.baseUrl,
    env.keycloak.realm,
    env.keycloak.clientId,
    env.keycloak.clientSecret
  )
}
