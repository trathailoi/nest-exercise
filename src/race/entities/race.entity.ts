import {
  Column, Entity, PrimaryGeneratedColumn, OneToMany
} from 'typeorm'
import { RaceResult } from '../../race-result/entities/race-result.entity'
import { BaseEntity } from '../../common/base.entity'

@Entity()
export class Race extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column('varchar', {
    nullable: false,
    length: 50
  })
    name?: string

  @OneToMany(() => RaceResult, (raceResult) => raceResult.race, {
    cascade: true,
    // // nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
    results?: RaceResult[]
}
