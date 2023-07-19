export class RequiredFieldError extends Error {
  constructor (fieldName?: string) {
    const message = fieldName === undefined
      ? 'Field required'
      : `The field ${fieldName} is required`
    super(message)
    this.name = 'RequiredFieldError'
  }
}

export class FieldNotEqualsError extends Error {
  constructor (fieldOneName: string, fieldTwoName: string) {
    const message = `The ${fieldOneName} field is different from the ${fieldTwoName} field`
    super(message)
    this.name = 'FieldNotEqualsError'
  }
}

export class InvalidEmailError extends Error {
  constructor () {
    const message = 'The field email is invalid'
    super(message)
    this.name = 'InvalidEmailError'
  }
}

export class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported file. Allowed extensions: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  constructor (maxSizeInMb: number) {
    super(`File upload limit is ${maxSizeInMb}MB`)
    this.name = 'MaxFileSizeError'
  }
}

export class InvalidDocumentError extends Error {
  constructor () {
    const message = 'The field document is invalid'
    super(message)
    this.name = 'InvalidDocumentError'
  }
}
