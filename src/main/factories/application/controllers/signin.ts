import { SignInController } from '@/application/controllers'
import { makeAuthentication } from '@/main/factories/domain/use-cases'

export const makeSignInController = (): SignInController => {
  return new SignInController(makeAuthentication())
}
