import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'

import { PgPerson } from './person'
import { PgUploadFile } from './upload-file'

@Entity({ name: 'person_attachment' })
export class PgPersonAttachment {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  type!: string

  @OneToOne(() => PgPerson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' })
  person!: PgPerson

  @OneToOne(() => PgUploadFile)
  @JoinColumn({ name: 'upload_file_id' })
  uploadFile!: PgUploadFile

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt?: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updatedAt?: Date
}
