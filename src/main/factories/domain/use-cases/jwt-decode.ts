import { JwtDecode, setupJwtDecode } from '@/domain/use-cases'
import { makeJwtAdapt } from '@/main/factories/infra/gateways'

export const makeJwtDecode = (): JwtDecode => {
  return setupJwtDecode(
    makeJwtAdapt()
  )
}
