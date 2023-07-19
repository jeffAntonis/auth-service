import { PgPerson } from '@/infra/repos/postgres/entities'
import { PgRepository } from '@/infra/repos/postgres/repository'
import { SavePerson, FindPersonByEmail, FindPersonByTaxDocument } from '@/domain/contracts/repos'
import { Person } from '@/domain/entities'

export class PgPersonRepository extends PgRepository implements SavePerson, FindPersonByEmail, FindPersonByTaxDocument {
  async save ({ id, language, culture, name, email, taxDocument }: SavePerson.Input): Promise<SavePerson.Output> {
    const pgPersonRepo = this.getRepository(PgPerson)
    return await pgPersonRepo.save({ id, culture, language, name, email, taxDocument })
  }

  async findByEmail ({ email }: FindPersonByEmail.Input): Promise<FindPersonByEmail.Output> {
    const pgPersonRepo = this.getRepository(PgPerson)
    return await pgPersonRepo.findOne({ where: { email } }) as Person
  }

  async findByTaxDocument ({ document }: FindPersonByTaxDocument.Input): Promise<FindPersonByTaxDocument.Output> {
    const pgPersonRepo = this.getRepository(PgPerson)
    return await pgPersonRepo.findOne({ where: { taxDocument: document } }) as Person
  }
}
