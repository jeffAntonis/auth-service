import { Controller, SignOutController } from '@/application/controllers'
import { SignOut } from '@/domain/use-cases'
import { Token } from '@/domain/entities'

type HttpRequest = {
  tokenDecode: Token
}

describe('SignOutController', () => {
  let sut: SignOutController
  let signOut: SignOut

  let request: HttpRequest

  beforeEach(() => {
    signOut = jest.fn()
    sut = new SignOutController(signOut)

    request = {
      tokenDecode: {
        sub: 'any_sub',
        sid: 'any_sid',
        name: 'any_name',
        email: 'any_email'
      }
    }
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call signOut with correct input', async () => {
    await sut.handle({ ...request })

    const { tokenDecode } = request
    expect(signOut).toHaveBeenCalledWith({ userId: tokenDecode.sub })
    expect(signOut).toHaveBeenCalledTimes(1)
  })
})
