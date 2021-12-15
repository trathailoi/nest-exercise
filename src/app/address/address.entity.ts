import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { BaseEntity } from '../common/base.entity'

@Entity()
export class Address extends BaseEntity {
  @ApiProperty({ format: 'uuid', example: 'f620a1bf-d317-4bcb-a190-0213bede890b' })
  @PrimaryGeneratedColumn('uuid')
    id?: string

  @ApiProperty({ example: 'John Doe' })
  @Column('varchar', {
    nullable: false,
    length: 150
  })
    name?: string

  @ApiProperty({ required: false, example: '123 Main St' })
  @Column('varchar', {
    nullable: false,
    length: 150
  })
    street?: string

  @ApiProperty({ required: false, example: 'Apt. 1' })
  @Column('varchar', {
    nullable: false,
    length: 150
  })
    street2?: string

  @ApiProperty({ example: 'Anytown' })
  @Column('varchar', {
    nullable: false,
    length: 40
  })
    city?: string

  @ApiProperty({ example: 'CA' })
  @Column('varchar', {
    nullable: false,
    length: 40
  })
    state?: string

  @ApiProperty({ example: '12345' })
  @Column('varchar', {
    nullable: false,
    length: 10
    // min: 5,
    // max: 10
  })
    zip?: string

  @ApiProperty({ example: 'United States' })
  @Column('varchar', {
    nullable: false,
    length: 40
  })
    country?: string
}
