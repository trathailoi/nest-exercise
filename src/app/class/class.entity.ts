import {
  Column, Entity, PrimaryGeneratedColumn, OneToMany
} from 'typeorm'
import { RaceResult } from '../race-result/race-result.entity'
import { BaseEntity } from '../common/base.entity'

@Entity()
export class Class extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column('varchar', {
    nullable: false,
    length: 50
  })
    name?: string

  @OneToMany(() => RaceResult, (raceResult) => raceResult.class)
    results?: RaceResult[]
}
