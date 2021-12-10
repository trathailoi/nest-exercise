import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany
} from 'typeorm'
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
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column('varchar', {
    nullable: false,
    length: 150
  })
    name?: string

  @Column({
    type: 'enum',
    enum: Nationality,
    default: Nationality.USA
  })
    nationality?: Nationality

  @ManyToOne(() => Address, (address) => address.id, {
    // cascade: true,
    nullable: true,
    onDelete: 'SET NULL'
  })
    businessAddress?: Address

  @ManyToMany(() => Driver, (driver) => driver.teams, {
    cascade: true
  })
  @JoinTable()
    drivers?: Driver[]

  @OneToMany(() => Car, (car) => car.team)
    cars?: Car[]
}