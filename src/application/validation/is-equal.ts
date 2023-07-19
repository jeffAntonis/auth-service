import { FieldNotEqualsError } from '@/application/error'
import { Validator } from '@/application/validation'

type Field = {
  value: any
  fieldName?: string
}

export class IsEqual implements Validator {
  constructor (
    readonly fieldOne: Field,
    readonly fieldTwo: Field
  ) {}

  validate (): Error | undefined {
    if (this.fieldOne.value !== this.fieldTwo.value) {
      return new FieldNotEqualsError(this.fieldOne?.fieldName ?? '', this.fieldTwo?.fieldName ?? '')
    }
  }
}
