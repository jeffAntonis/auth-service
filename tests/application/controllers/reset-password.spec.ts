import { Controller, ForgotPasswordController } from '@/application/controllers'
import { RequiredString, IsEmail } from '@/application/validation'

type HttpRequest = {
  email: string
}

describe('ForgotPasswordController', () => {
  let sut: ForgotPasswordController
  let findPersonByEmail: jest.Mock
  let resetPassword: jest.Mock

  let request: HttpRequest

  beforeEach(() => {
    request = {
      email: 'any_email@email.com'
    }
  })

  beforeEach(() => {
    findPersonByEmail = jest.fn().mockReturnValue({ id: 'valid_id' })
    resetPassword = jest.fn()
    sut = new ForgotPasswordController(findPersonByEmail, resetPassword)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ ...request })

    expect(validators).toEqual([
      new RequiredString('any_email@email.com', 'email'),
      new IsEmail('any_email@email.com', 'email')
    ])
  })

  it('should call findPersonByEmail with correct input', async () => {
    await sut.handle({ ...request })

    const { email } = request
    expect(findPersonByEmail).toHaveBeenCalledWith({ email })
    expect(findPersonByEmail).toHaveBeenCalledTimes(1)
  })

  it('should call resetPassword with correct input', async () => {
    await sut.handle({ ...request })

    expect(resetPassword).toHaveBeenCalledWith({ id: 'valid_id' })
    expect(resetPassword).toHaveBeenCalledTimes(1)
  })
})
