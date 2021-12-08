import {
  Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany
} from 'typeorm'
import { Class } from '../../class/entities/class.entity'
import { Team } from '../../team/entities/team.entity'
import { RaceResult } from '../../race-result/entities/race-result.entity'
import { BaseEntity } from '../../common/base.entity'

/**
 * This class defines an entity that represents cars in the database.
 * Each car has a make, model, VIN number, and color.  Later on, I'll
 * add owners to show how we model relationships between different entities.
 *
 * Note the @Entity() annotation on the class - this annotation tells TypeORM
 * that this class represents a table in the database.  Changes made to this
 * entity will result in changes in the database structure (so be careful!).
 * TODO: Add Owner entity.
 */
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
