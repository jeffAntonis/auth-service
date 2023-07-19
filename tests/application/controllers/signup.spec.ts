import { Controller, SignUpController } from '@/application/controllers'
import { RequiredString, IsEqual, IsEmail, Required } from '@/application/validation'
import { PersonDocumentType } from '@/domain/entities'

type HttpRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string

  language?: string
  culture?: string

  attachments?: [{ uploadId: string, attachmentType: string }]

  documentType: PersonDocumentType
  document: string

  enableSecondAuthenticationFactor: boolean
}

describe('SignUpController', () => {
  let sut: SignUpController
  let getPersonByTaxDocument: jest.Mock
  let addAccount: jest.Mock
  let authentication: jest.Mock
  let jwtDecode: jest.Mock
  let addPerson: jest.Mock
  let configureTotp: jest.Mock

  let request: HttpRequest

  beforeEach(() => {
    getPersonByTaxDocument = jest.fn()
    addAccount = jest.fn()
    authentication = jest.fn().mockReturnValue({ access_token: 'any_access_token' })
    jwtDecode = jest.fn().mockReturnValue({ sub: 'any_id' })
    addPerson = jest.fn()
    configureTotp = jest.fn()

    request = {
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      email: 'any_email@email.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',

      language: 'any_language',
      culture: 'any_culture',

      document: 'any_document_type',
      documentType: PersonDocumentType.rg,

      enableSecondAuthenticationFactor: false
    }
  })

  beforeEach(() => {
    sut = new SignUpController(getPersonByTaxDocument, addAccount, authentication, jwtDecode, addPerson, configureTotp)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const { firstName, lastName, email, password, passwordConfirmation, document, documentType, enableSecondAuthenticationFactor } = request
    const validators = sut.buildValidators({ firstName, lastName, email, password, passwordConfirmation, document, documentType, enableSecondAuthenticationFactor })

    expect(validators).toEqual([
      new RequiredString('any_first_name', 'firstName'),
      new RequiredString('any_last_name', 'lastName'),
      new RequiredString('any_email@email.com', 'email'),
      new RequiredString('any_password', 'password'),
      new RequiredString('any_password', 'passwordConfirmation'),
      new IsEmail('any_email@email.com', 'email'),
      new IsEqual({ value: 'any_password', fieldName: 'password' }, { value: 'any_password', fieldName: 'passwordConfirmation' }),
      new RequiredString('any_document_type', 'document')
    ])
  })

  it('should call getPersonByTaxDocument with correct input', async () => {
    await sut.handle({ ...request })

    const { document } = request
    expect(getPersonByTaxDocument).toHaveBeenCalledWith({ document })
    expect(getPersonByTaxDocument).toHaveBeenCalledTimes(1)
  })

  it('should call addAccount with correct input', async () => {
    await sut.handle({ ...request })

    const { firstName, lastName, email, password } = request
    expect(addAccount).toHaveBeenCalledWith({ firstName, lastName, email, password })
    expect(addAccount).toHaveBeenCalledTimes(1)
  })

  it('should call authentication with correct input', async () => {
    await sut.handle({ ...request })

    const { email, password } = request
    expect(authentication).toHaveBeenCalledWith({ email, password })
    expect(authentication).toHaveBeenCalledTimes(1)
  })

  it('should call jwtDecode with correct input', async () => {
    await sut.handle({ ...request })

    expect(jwtDecode).toHaveBeenCalledWith({ accessToken: 'any_access_token' })
    expect(jwtDecode).toHaveBeenCalledTimes(1)
  })

  it('should call addPerson with correct input', async () => {
    await sut.handle({ ...request })
    const { language, culture, document } = request
    expect(addPerson).toHaveBeenCalledWith({ language, culture, id: 'any_id', taxDocument: document })
    expect(addPerson).toHaveBeenCalledTimes(1)
  })
})
