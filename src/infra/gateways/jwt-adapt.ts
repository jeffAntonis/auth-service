import { Decode } from '@/domain/contracts/gateways'

import jwtDecode from 'jwt-decode'

export class JwtAdapt implements Decode {
  async decode ({ accessToken }: Decode.Input): Promise<Decode.Output> {
    return jwtDecode(accessToken)
  }
}
