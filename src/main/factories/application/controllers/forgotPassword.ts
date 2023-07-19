import { ForgotPasswordController } from '@/application/controllers'
import { makeFindPersonByEmail, makeResetPassword } from '@/main/factories/domain/use-cases'

export const makeForgotPasswordController = (): ForgotPasswordController => {
  return new ForgotPasswordController(makeFindPersonByEmail(), makeResetPassword())
}
