import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AddressService } from './address.service'
import { AddressController } from './address.controller'
import { Address } from './address.entity'

import { Mapper } from '../common/mapper'

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [
    AddressService,
    {
      provide: 'MAPPER',
      useValue: new Mapper()
    }
  ]
})
export class AddressModule {}
