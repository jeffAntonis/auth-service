import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'upload_file' })
export class PgUploadFile {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name?: string

  @Column()
  path?: string

  @Column()
  key?: string

  @Column()
  directory?: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  created_at?: Date

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updated_at?: Date
}
