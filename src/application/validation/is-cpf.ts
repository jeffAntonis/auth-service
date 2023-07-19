/* eslint-disable prefer-regex-literals */
import { InvalidDocumentError } from '@/application/error'
import { Validator } from '@/application/validation'

export class IsCpf implements Validator {
  constructor (
    readonly value: any,
    readonly fieldName?: string
  ) {}

  isValid (): boolean {
    let cpf = this.value.trim()
    console.log('cpf', cpf)

    cpf = cpf.replace(/\./g, '')
    cpf = cpf.replace('-', '')
    cpf = cpf.split('')
    console.log('cpf', cpf)

    let v1 = 0
    let v2 = 0
    let aux = false

    for (let i = 1; cpf.length > i; i++) {
      if (Number(cpf[i - 1]) !== Number(cpf[i])) {
        aux = true
      }
    }

    if (!aux) {
      return false
    }

    for (let i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
      v1 += Number(cpf[i]) * p
    }

    v1 = ((v1 * 10) % 11)

    if (v1 === 10) {
      v1 = 0
    }

    if (v1 !== Number(cpf[9])) {
      return false
    }

    for (let i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
      v2 += Number(cpf[i]) * p
    }

    v2 = ((v2 * 10) % 11)

    if (v2 === 10) {
      v2 = 0
    }

    if (v2 !== Number(cpf[10])) {
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
