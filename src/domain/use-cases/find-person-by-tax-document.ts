import { FindPersonByTaxDocument as FindPersonByTaxDocumentRepo } from '@/domain/contracts/repos'
import { Person } from '@/domain/entities/person'

export type FindPersonByTaxDocument = (input: { document: string }) => Promise<Person>

type Setup = (findPersonByTaxDocumentRepository: FindPersonByTaxDocumentRepo) => FindPersonByTaxDocument

export const setupFindPersonByTaxDocument: Setup = (findPersonByTaxDocumentRepository) => async input => {
  return await findPersonByTaxDocumentRepository.findByTaxDocument({ document: input.document })
}
