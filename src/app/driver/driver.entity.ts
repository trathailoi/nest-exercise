import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Address } from '../address/address.entity'
import { Team } from '../team/team.entity'
import { RaceResult } from '../race-result/race-result.entity'
import { BaseEntity } from '../common/base.entity'

enum Nationality {
  USA = 'USA',
  VietNam = 'Viet Nam'
}

@Entity()
export class Driver extends BaseEntity {
  @ApiProperty({ format: 'uuid', example: 'f620a1bf-d317-4bcb-a190-0213bede890b' })
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @ApiProperty({ example: 'Nguyen' })
  @Column('varchar', {
    nullable: false,
    length: 50
  })
    firstName?: string

  @ApiProperty({ example: 'An' })
  @Column('varchar', {
    nullable: false,
    length: 50
  })
    lastName?: string

  @ApiProperty({ example: 'Viet Nam' })
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
    homeAddress?: Address

  @ApiProperty()
  @ManyToOne(() => Address, (address) => address.id, {
    // cascade: true,
    nullable: true,
    onDelete: 'SET NULL'
  })
    managementAddress?: Address

  @ApiProperty({ type: () => Team, isArray: true })
  @ManyToMany(() => Team, (team) => team.drivers, {
    onDelete: 'CASCADE'
  })
    teams?: Team[]

  @OneToMany(() => RaceResult, (raceResult) => raceResult.driver)
    results?: RaceResult[]
}
