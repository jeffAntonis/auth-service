import { Decrypter } from '../contracts/gateways'

export type CryptoDecryptInput = { encryptedPassword: string, salt: number }
export type CryptoDecryptOutput = {
  decryptedPassword: string
}

export type CryptoDecrypt = (input: CryptoDecryptInput) => Promise<CryptoDecryptOutput>

type Setup = (decrypter: Decrypter) => CryptoDecrypt

export const setupCryptoDecrypt: Setup = (decrypter) => async input => {
  return await decrypter.decrypt(input)
}
