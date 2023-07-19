import { Person } from '@/domain/entities'

// SAVE PERSON
export interface SavePerson {
  save: (input: SavePerson.Input) => Promise<SavePerson.Output>
}

export namespace SavePerson {
  export type Input = { id: string, culture?: string, language?: string, name: string, email: string, taxDocument: string }
  export type Output = any
}

// GET PERSON BY TAX DOCUMENT
export interface FindPersonByTaxDocument {
  findByTaxDocument: (input: FindPersonByTaxDocument.Input) => Promise<FindPersonByTaxDocument.Output>
}

export namespace FindPersonByTaxDocument {
  export type Input = {
    document: string
  }
  export type Output = Person
}

// GET PERSON BY EMAIL
export interface FindPersonByEmail {
  findByEmail: (input: FindPersonByEmail.Input) => Promise<FindPersonByEmail.Output>
}

export namespace FindPersonByEmail {
  export type Input = { email: string }
  export type Output = Person
}
