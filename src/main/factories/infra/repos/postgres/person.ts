import { PgPersonRepository } from '@/infra/repos/postgres'

export const makePgPersonRepository = (): PgPersonRepository => {
  return new PgPersonRepository()
}
