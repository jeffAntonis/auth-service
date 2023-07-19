import { SignOutController } from '@/application/controllers'
import { makeSignOut } from '@/main/factories/domain/use-cases'

export const makeSignOutController = (): SignOutController => {
  return new SignOutController(makeSignOut())
}
