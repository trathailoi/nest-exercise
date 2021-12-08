import {
  PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, BaseEntity as SuperBaseEntity
} from 'typeorm'

export abstract class BaseEntity extends SuperBaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id?: string

  @Column({ type: 'boolean', default: true })
    isActive?: boolean

  @Column({ type: 'boolean', default: false })
    isArchived?: boolean

  // @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn({
    type: 'timestamptz',
    default: 'now()',
    nullable: true
  })
    createdAt?: Date

  // @Column({ type: 'varchar', length: 300 })
  //   createdBy: string

  // @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: 'now()',
    nullable: true
  })
    modifiedAt?: Date

  // @Column({ type: 'varchar', length: 300 })
  //   modifiedBy: string

  // @Column({ type: 'varchar', length: 300, nullable: true })
  //   internalComment: string
}
