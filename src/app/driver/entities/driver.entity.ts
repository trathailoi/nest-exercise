import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany
} from 'typeorm'
import { Address } from '../../address/entities/address.entity'
import { Team } from '../../team/entities/team.entity'
import { RaceResult } from '../../race-result/entities/race-result.entity'
import { BaseEntity } from '../../common/base.entity'

enum Nationality {
  USA = 'USA',
  VietNam = 'Viet Nam'
}

@Entity()
export class Driver extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column('varchar', {
    nullable: false,
    length: 50
  })
    firstName?: string

  @Column('varchar', {
    nullable: false,
    length: 50
  })
    lastName?: string

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
    homeAddress?: Address

  @ManyToOne(() => Address, (address) => address.id, {
    // cascade: true,
    nullable: true,
    onDelete: 'SET NULL'
  })
    managementAddress?: Address

  @ManyToMany(() => Team, (team) => team.drivers, {
    onDelete: 'CASCADE'
  })
    teams?: Team[]

  @OneToMany(() => RaceResult, (raceResult) => raceResult.driver)
    results?: RaceResult[]
}
