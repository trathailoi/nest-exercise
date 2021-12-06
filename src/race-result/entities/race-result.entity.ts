import {
  Column, Entity, Unique, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm'
import { BaseEntity } from '../../common/base.entity'
import { Car } from '../../car/entities/car.entity'
import { Race } from '../../race/entities/race.entity'
import { Driver } from '../../driver/entities/driver.entity'
import { Class } from '../../class/entities/class.entity'

@Entity()
@Unique('unique_result_index', ['car', 'race', 'driver'])
export class RaceResult extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column('int')
    carNumber?: number

  @ManyToOne(() => Race, (race) => race.results, {
    // cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false
  })
    race?: Race

  @ManyToOne(() => Class, (_class) => _class.results, {
    nullable: false
  })
    class?: Class

  @ManyToOne(() => Car, (car) => car.results, {
    nullable: false
  })
    car?: Car

  @ManyToOne(() => Driver, (driver) => driver.results, {
    // cascade: true,
    onDelete: 'CASCADE',
    nullable: false
  })
    driver?: Driver

  @Column('int', {
    nullable: false
  })
    startingPosition?: number

  @Column('int', {
    nullable: true
  })
    finishingPosition?: number

  @Column('bool', {
    nullable: true
  })
    isFinished?: boolean
}
