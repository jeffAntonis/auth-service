import { JwtAdapt } from '@/infra/gateways'

export const makeJwtAdapt = (): JwtAdapt => {
  return new JwtAdapt()
}
