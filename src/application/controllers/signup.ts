/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { AddAccount, AddPerson, Authentication, JwtDecode, FindPersonByTaxDocument } from '@/domain/use-cases'
import { FieldInUseError } from '@/application/error'
import { PersonDocumentType } from '@/domain/entities'
import { ConfigureTotp } from '@/domain/use-cases/configure-totp'

type HttpRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation?: string

  language?: string
  culture?: string

  documentType: PersonDocumentType
  document: string

  enableSecondAuthenticationFactor: boolean
}

type Response = Error | {}

export class SignUpController extends Controller {
  constructor (
    private readonly findPersonByTaxDocument: FindPersonByTaxDocument,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication,
    private readonly jwtDecode: JwtDecode,
    private readonly addPerson: AddPerson,
    private readonly configureTotp: ConfigureTotp
  ) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    try {
      const { firstName, lastName, email, password, culture, language, document, enableSecondAuthenticationFactor } = httpRequest

      if (document != null) {
        const person = await this.findPersonByTaxDocument({ document })
        if (person != null) {
          return badRequest(new FieldInUseError('document'))
        }
      }

      await this.addAccount({ firstName, lastName, email, password })
      const { access_token } = await this.authentication({ email, password })

      const tokenDecode = await this.jwtDecode({ accessToken: access_token })
      if (tokenDecode == null) {
        return badRequest(new Error('invalid token'))
      }

      if (enableSecondAuthenticationFactor) {
        await this.configureTotp({ id: tokenDecode.sub })
      }
      await this.addPerson({ culture, language, id: tokenDecode.sub, email: tokenDecode?.email, name: tokenDecode?.name, taxDocument: document })

      return ok(true)
    } catch (error: any) {
      console.log(error)
      if (['User exists with same username', 'User exists with same email'].includes(error?.response?.data?.errorMessage)) return badRequest(new FieldInUseError('email'))

      if (error?.response?.data !== null) {
        if (typeof error?.response?.data === 'string') {
          return badRequest(new Error(error?.response?.data))
        }

        if (error?.response?.data?.errorMessage !== null) {
          return badRequest(new Error(error?.response?.data?.errorMessage))
        }

        return badRequest(new Error(error?.response?.data?.error_description))
      }
      throw error
    }
  }

  override buildValidators ({ firstName, lastName, email, password, passwordConfirmation, document, enableSecondAuthenticationFactor, documentType }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: firstName, fieldName: 'firstName' }).required().build(),
      ...Builder.of({ value: lastName, fieldName: 'lastName' }).required().build(),
      ...Builder.of({ value: email, fieldName: 'email' }).required().build(),
      ...Builder.of({ value: password, fieldName: 'password' }).required().build(),
      ...Builder.of({ value: passwordConfirmation, fieldName: 'passwordConfirmation' }).required().build(),
      ...Builder.of({ value: email, fieldName: 'email' }).isEmail().build(),
      ...Builder.ofTwoFields({ value: password, fieldName: 'password' }, { value: passwordConfirmation, fieldName: 'passwordConfirmation' }).isEqual().build(),
      ...Builder.of({ value: document, fieldName: 'document' }).required().isDocument({ documentType }).build()
    ]
  }
}
