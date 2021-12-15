import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { BaseEntity } from '../common/base.entity'
import { Address } from '../address/address.entity'
import { Driver } from '../driver/driver.entity'
import { Car } from '../car/car.entity'

enum Nationality {
  USA = 'USA',
  VietNam = 'Viet Nam'
}

@Entity()
export class Team extends BaseEntity {
  @ApiProperty({ format: 'uuid', example: 'f620a1bf-d317-4bcb-a190-0213bede890b' })
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @ApiProperty({ example: '7MILES' })
  @Column('varchar', {
    nullable: false,
    length: 150
  })
    name?: string

  @ApiProperty({ example: 'USA' })
  @Column({
    type: 'enum',
    enum: Nationality,
    default: Nationality.USA
  })
    nationality?: Nationality

  @ApiProperty()
  @ManyToOne(() => Address, (address) => address.id, {
    // cascade: true,
    nullable: true,
    onDelete: 'SET NULL'
  })
    businessAddress?: Address

  @ApiProperty({ type: () => Driver, isArray: true })
  @ManyToMany(() => Driver, (driver) => driver.teams, {
    cascade: true
  })
  @JoinTable()
    drivers?: Driver[]

  @OneToMany(() => Car, (car) => car.team)
    cars?: Car[]
}
