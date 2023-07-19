import { Controller, SignInController } from '@/application/controllers'
import { RequiredString, IsEmail } from '@/application/validation'

type HttpRequest = {
  email: string
  password: string
}

describe('SignInController', () => {
  let sut: SignInController
  let authentication: jest.Mock

  let request: HttpRequest

  beforeEach(() => {
    authentication = jest.fn().mockReturnValue({ access_token: 'any_access_token' })

    request = {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  })

  beforeEach(() => {
    sut = new SignInController(authentication)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ ...request })

    expect(validators).toEqual([
      new RequiredString('any_email@email.com', 'email'),
      new RequiredString('any_password', 'password'),
      new IsEmail('any_email@email.com', 'email')
    ])
  })

  it('should call authentication with correct input', async () => {
    await sut.handle({ ...request })

    const { email, password } = request
    expect(authentication).toHaveBeenCalledWith({ email, password })
    expect(authentication).toHaveBeenCalledTimes(1)
  })
})
