import { FindPersonByEmail, setupFindPersonByEmail } from '@/domain/use-cases'
import { makePgPersonRepository } from '@/main/factories/infra/repos/postgres'

export const makeFindPersonByEmail = (): FindPersonByEmail => {
  return setupFindPersonByEmail(
    makePgPersonRepository()
  )
}
