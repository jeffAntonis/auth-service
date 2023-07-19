/* eslint-disable prefer-regex-literals */
import { InvalidEmailError } from '@/application/error'
import { Validator } from '@/application/validation'

export class IsEmail implements Validator {
  constructor (
    readonly value: any,
    readonly fieldName?: string
  ) {}

  validate (): Error | undefined {
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
    if (!regex.test(this.value)) {
      return new InvalidEmailError()
    }
  }
}
