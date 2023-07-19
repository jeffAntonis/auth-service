import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'persons' })
export class PgPerson {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: true })
  name?: string

  @Column()
  email!: string

  @Column()
  taxDocument!: string

  @Column({ nullable: true })
  culture?: string

  @Column({ nullable: true })
  language?: string
}
