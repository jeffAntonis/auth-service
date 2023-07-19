import { FindPersonByEmail as FindPersonByEmailRepo } from '@/domain/contracts/repos'
import { Person } from '@/domain/entities/person'

export type FindPersonByEmail = (input: { email: string }) => Promise<Person>

type Setup = (findPersonByEmailRepository: FindPersonByEmailRepo) => FindPersonByEmail

export const setupFindPersonByEmail: Setup = (findPersonByEmailRepository) => async input => {
  return await findPersonByEmailRepository.findByEmail({ email: input.email })
}
