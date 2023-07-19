import { Validator, Required, RequiredBuffer, RequiredString, IsEqual, IsEmail, AllowedMimeTypes, Extension, MaxFileSize, IsCpf, IsCnpj } from '@/application/validation'
import { PersonDocumentType } from '@/domain/entities'

type Field = {
  value: any
  fieldName?: string
}

export class ValidationBuilder {
  private constructor (
    private readonly fieldOne: Field,
    private readonly fieldTwo?: Field,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ value, fieldName }: Field): ValidationBuilder {
    return new ValidationBuilder({ value, fieldName })
  }

  static ofTwoFields (fieldOne: Field, fieldTwo: Field): ValidationBuilder {
    return new ValidationBuilder({ value: fieldOne.value, fieldName: fieldOne.fieldName }, { value: fieldTwo.value, fieldName: fieldTwo.fieldName })
  }

  required (): ValidationBuilder {
    const { value, fieldName } = this.fieldOne
    if (value instanceof Buffer) {
      this.validators.push(new RequiredBuffer(value, fieldName))
    } else if (typeof value === 'string') {
      this.validators.push(new RequiredString(value, fieldName))
    } else {
      this.validators.push(new Required(value, fieldName))
      if (value?.buffer !== undefined) {
        this.validators.push(new RequiredBuffer(value.buffer, fieldName))
      }
    }
    return this
  }

  isEqual (): ValidationBuilder {
    this.validators.push(new IsEqual(
      { value: this.fieldOne.value, fieldName: this.fieldOne?.fieldName },
      { value: this.fieldTwo?.value, fieldName: this.fieldTwo?.fieldName })
    )
    return this
  }

  isEmail (): ValidationBuilder {
    const { value, fieldName } = this.fieldOne
    this.validators.push(new IsEmail(value, fieldName))
    return this
  }

  image ({ allowed, maxSizeInMb }: { allowed: Extension[], maxSizeInMb: number }): ValidationBuilder {
    const { value } = this.fieldOne
    if (value.mimeType !== undefined) {
      this.validators.push(new AllowedMimeTypes(allowed, value.mimeType))
    }
    if (value.buffer !== undefined) {
      this.validators.push(new MaxFileSize(maxSizeInMb, value.buffer))
    }
    return this
  }

  isDocument ({ documentType }: { documentType: PersonDocumentType }): ValidationBuilder {
    const { value, fieldName } = this.fieldOne
    if (documentType === PersonDocumentType.cpf) {
      this.validators.push(new IsCpf(value, fieldName))
    }

    if (documentType === PersonDocumentType.cnpj) {
      this.validators.push(new IsCnpj(value, fieldName))
    }
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
