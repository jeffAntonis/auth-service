import { Decode } from '@/domain/contracts/gateways'
import { Token } from '@/domain/entities'

type Input = { accessToken: string }
type Output = Token | undefined

export type JwtDecode = (input: Input) => Promise<Output>

type Setup = (tokenDecode: Decode) => JwtDecode

export const setupJwtDecode: Setup = (tokenDecode) => async input => {
  return await tokenDecode.decode(input)
}
