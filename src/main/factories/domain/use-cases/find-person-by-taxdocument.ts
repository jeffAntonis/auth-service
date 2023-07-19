import { FindPersonByTaxDocument, setupFindPersonByTaxDocument } from '@/domain/use-cases'
import { makePgPersonRepository } from '@/main/factories/infra/repos/postgres'

export const makeFindPersonByTaxDocument = (): FindPersonByTaxDocument => {
  return setupFindPersonByTaxDocument(
    makePgPersonRepository()
  )
}
