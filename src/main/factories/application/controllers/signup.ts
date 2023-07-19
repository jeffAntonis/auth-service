import { SignUpController } from '@/application/controllers'
import { makeFindPersonByTaxDocument, makeAddAccount, makeAuthentication, makeAddPerson, makeJwtDecode, makeConfigureTotp } from '@/main/factories/domain/use-cases'

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(
    makeFindPersonByTaxDocument(),
    makeAddAccount(),
    makeAuthentication(),
    makeJwtDecode(),
    makeAddPerson(),
    makeConfigureTotp()
  )
}
