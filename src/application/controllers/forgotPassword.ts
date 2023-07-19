import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { FindPersonByEmail, ResetPassword } from '@/domain/use-cases'
import { PersonNotFoundError } from '@/application/error'

type HttpRequest = {
  email: string
}

type Response = Error | {}

export class ForgotPasswordController extends Controller {
  constructor (private readonly findPersonByEmail: FindPersonByEmail, private readonly resetPassword: ResetPassword) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    try {
      const { email } = httpRequest
      const person = await this.findPersonByEmail({ email })
      if (person === undefined) {
        return badRequest(new PersonNotFoundError(email))
      }
      await this.resetPassword({ id: person?.id })
      return ok(true)
    } catch (error: any) {
      console.log(error)
      if (error?.response?.data != null) {
        if (typeof error?.response?.data === 'string') {
          return badRequest(new Error(error?.response?.data))
        }

        if (typeof error?.response?.data?.error === 'string') {
          return badRequest(new Error(error?.response?.data?.error))
        }

        return badRequest(new Error(error?.response?.data?.error_description))
      }
      throw error
    }
  }

  override buildValidators ({ email }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: email, fieldName: 'email' }).required().build(),
      ...Builder.of({ value: email, fieldName: 'email' }).isEmail().build()
    ]
  }
}
