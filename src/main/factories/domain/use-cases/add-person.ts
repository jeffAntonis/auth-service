import { AddPerson, setupAddPerson } from '@/domain/use-cases'
import { makePgPersonRepository } from '@/main/factories/infra/repos/postgres'

export const makeAddPerson = (): AddPerson => {
  return setupAddPerson(
    makePgPersonRepository()
  )
}
