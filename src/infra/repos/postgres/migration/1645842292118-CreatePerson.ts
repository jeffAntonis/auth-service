import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePerson1645842292118 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'persons',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'taxDocument',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'culture',
            type: 'varchar',
            default: '\'Brasil\''
          },
          {
            name: 'language',
            type: 'varchar',
            default: '\'pt-br\''
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('persons')
  }
}
