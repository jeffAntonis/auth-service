import { Person } from '@/domain/entities'
import { SavePerson } from '@/domain/contracts/repos'

export type AddPerson = (input: Person) => Promise<Person>
type Setup = (personAccountRepository: SavePerson) => AddPerson

export const setupAddPerson: Setup = (personAccountRepository) => async input => {
  return await personAccountRepository.save(input)
}
