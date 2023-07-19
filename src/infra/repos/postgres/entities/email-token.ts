import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm'

@Entity({ name: 'email_token' })
export class PgEmailToken {
  @PrimaryColumn()
  id?: string

  @Column()
  email!: string

  @Column()
  token!: string

  @Column({ name: 'confirmed_at', nullable: true })
  confirmedAt?: Date;
  
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt?: Date;
}
