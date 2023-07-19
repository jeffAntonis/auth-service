export interface Encrypter {
  encrypt: (input: Encrypter.Input) => Promise<Encrypter.Output>
}

export namespace Encrypter {
  export type Input = { encryptedPassword: string, salt: number }
  export type Output = {
    decryptedPassword: string
  }
}

export interface Decrypter {
  decrypt: (input: Decrypter.Input) => Promise<Decrypter.Output>
}

export namespace Decrypter {
  export type Input = { encryptedPassword: string, salt: number }
  export type Output = {
    decryptedPassword: string
  }
}
