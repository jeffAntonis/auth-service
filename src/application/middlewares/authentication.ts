import { forbidden, HttpResponse, ok } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'
import { RequiredString } from '@/application/validation'
import { JwtDecode } from '@/domain/use-cases'

type HttpRequest = { authorization: string }
type Model = Error | any

export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly jwtDecode: JwtDecode) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!this.validate({ authorization })) return forbidden()
    const token = (authorization ?? '').split(' ')
    try {
      const tokenDecode = await this.jwtDecode({ accessToken: token?.[1] ?? '' })
      console.log('tokenDecode', tokenDecode)
      if ((tokenDecode?.exp) != null) {
        if (new Date(tokenDecode.exp * 1000) > new Date()) {
          return ok({ tokenDecode })
        }
      }

      return forbidden()
    } catch {
      return forbidden()
    }
  }

  private validate ({ authorization }: HttpRequest): boolean {
    const error = new RequiredString(authorization, 'authorization').validate()
    return error === undefined
  }
}
