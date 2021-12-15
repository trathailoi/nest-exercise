import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClassService } from './class.service'
import { ClassController } from './class.controller'
import { Class } from './class.entity'

import { Mapper } from '../common/mapper'

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  controllers: [ClassController],
  providers: [
    ClassService,
    Mapper
  ]
})
export class ClassModule {}
