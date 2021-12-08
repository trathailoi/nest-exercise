import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DatabaseModule } from './database/database.module'

import { CarModule } from './car/car.module'
import { AddressModule } from './address/address.module'
import { ClassModule } from './class/class.module'
import { DriverModule } from './driver/driver.module'
import { RaceModule } from './race/race.module'
import { TeamModule } from './team/team.module'
import { RaceResultModule } from './race-result/race-result.module'

@Module({
  imports: [
    CarModule,
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development')
      })
    }),
    AddressModule,
    ClassModule,
    DriverModule,
    RaceModule,
    TeamModule,
    RaceResultModule
    // AutomapperModule.forRoot({
    //   options: [{
    //     name: 'classMapper',
    //     pluginInitializer: classes
    //     // namingConventions: new CamelCaseNamingConvention()
    //   }],
    //   singular: true
    // })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
