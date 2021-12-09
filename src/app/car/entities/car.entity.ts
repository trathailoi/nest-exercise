import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany
} from 'typeorm'
import { Class } from '../../class/entities/class.entity'
import { Team } from '../../team/entities/team.entity'
import { RaceResult } from '../../race-result/entities/race-result.entity'
import { BaseEntity } from '../../common/base.entity'

@Entity()
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column('varchar', {
    nullable: false,
    length: 40
  })
    name?: string

  @Column('varchar', {
    nullable: false,
    length: 40
  })
    make?: string

  @Column('varchar', {
    nullable: false,
    length: 40
  })
    model?: string

  @ManyToOne(() => Class)
    class?: Class

  @ManyToOne(() => Team)
    team?: Team

  @OneToMany(() => RaceResult, (raceResult) => raceResult.car)
    results?: RaceResult[]
}
