import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { PgPerson } from './person'

@Entity({ name: 'person_document' })
export class PgPersonDocument {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'document_type' })
  documentType!: string

  @Column()
  document!: string

  @Column({ nullable: true })
  uf?: string

  @Column({ type: 'jsonb', nullable: true })
  data?: any;

  @ManyToOne(() => PgPerson, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'person_id' })
  person!: PgPerson;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt?: Date;
}
