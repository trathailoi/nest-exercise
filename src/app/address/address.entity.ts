import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '../common/base.entity'

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id?: string

  @Column('varchar', {
    nullable: false,
    length: 150
  })
    name?: string

  @Column('varchar', {
    nullable: false,
    length: 150
  })
    street?: string

  @Column('varchar', {
    nullable: false,
    length: 150
  })
    street2?: string

  @Column('varchar', {
    nullable: false,
    length: 40
  })
    city?: string

  @Column('varchar', {
    nullable: false,
    length: 40
  })
    state?: string

  @Column('varchar', {
    nullable: false,
    length: 10
    // min: 5,
    // max: 10
  })
    zip?: string

  @Column('varchar', {
    nullable: false,
    length: 40
  })
    country?: string
}
