import { AuthenticationMiddleware } from '@/application/middlewares'
import { makeJwtDecode } from '@/main/factories/domain/use-cases'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  return new AuthenticationMiddleware(makeJwtDecode())
}
