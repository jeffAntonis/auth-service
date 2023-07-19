import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { Token } from '@/domain/entities'
import { SignOut } from '@/domain/use-cases'

type HttpRequest = {
  tokenDecode: Token
}

type Response = Error | {}

export class SignOutController extends Controller {
  constructor (private readonly signOut: SignOut) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    try {
      const { tokenDecode } = httpRequest
      await this.signOut({ userId: tokenDecode.sub })
      return ok(true)
    } catch (error: any) {
      console.log(error)
      if (error?.response?.data != null) {
        if (typeof error?.response?.data === 'string') {
          return badRequest(new Error(error?.response?.data))
        }

        return badRequest(new Error(error?.response?.data?.error_description))
      }
      throw error
    }
  }
}
