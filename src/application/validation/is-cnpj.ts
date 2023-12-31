/* eslint-disable prefer-regex-literals */
import { InvalidDocumentError } from '@/application/error'
import { Validator } from '@/application/validation'

export class IsCnpj implements Validator {
  constructor (
    readonly value: any,
    readonly fieldName?: string
  ) {}

  isValid (): boolean {
    let cnpj = this.value.trim()

    cnpj = cnpj.replace(/\./g, '')
    cnpj = cnpj.replace('-', '')
    cnpj = cnpj.replace('/', '')
    cnpj = cnpj.split('')

    let v1 = 0
    let v2 = 0
    let aux = false

    for (let i = 1; cnpj.length > i; i++) {
      if (Number(cnpj[i - 1]) !== Number(cnpj[i])) {
        aux = true
      }
    }

    if (!aux) {
      return false
    }

    for (let i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v1 += Number(cnpj[i]) * p1
      } else {
        v1 += Number(cnpj[i]) * p2
      }
    }

    v1 = (v1 % 11)

    if (v1 < 2) {
      v1 = 0
    } else {
      v1 = (11 - v1)
    }

    if (v1 !== Number(cnpj[12])) {
      return false
    }

    for (let i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
      if (p1 >= 2) {
        v2 += Number(cnpj[i]) * p1
      } else {
        v2 += Number(cnpj[i]) * p2
      }
    }

    v2 = (v2 % 11)

    if (v2 < 2) {
      v2 = 0
    } else {
      v2 = (11 - v2)
    }

    if (v2 !== Number(cnpj[13])) {
      return false
    } else {
      return true
    }
  }

  validate (): Error | undefined {
    if (!this.isValid()) {
      return new InvalidDocumentError()
    }
  }
}
