import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { Validator, ValidationBuilder as Builder } from '@/application/validation'
import { Authentication } from '@/domain/use-cases'

type HttpRequest = {
  email: string
  password: string
  totp?: string
}

type Response = Error | {}

export class SignInController extends Controller {
  constructor (private readonly authentication: Authentication) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    try {
      const { email, password, totp } = httpRequest
      const authResult = await this.authentication({ email, password, totp })
      return ok({
        access_token: authResult?.access_token,
        expires_in: authResult?.expires_in,
        refresh_token: authResult?.refresh_token,
        refresh_expires_in: authResult?.refresh_expires_in
      })
    } catch (error: any) {
      if (error?.response?.data != null) {
        if (typeof error?.response?.data === 'string') {
          return badRequest(new Error(error?.response?.data))
        }

        return badRequest(new Error(error?.response?.data?.error_description))
      }
      throw error
    }
  }

  override buildValidators ({ email, password }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: email, fieldName: 'email' }).required().build(),
      ...Builder.of({ value: password, fieldName: 'password' }).required().build(),
      ...Builder.of({ value: email, fieldName: 'email' }).isEmail().build()
    ]
  }
}
