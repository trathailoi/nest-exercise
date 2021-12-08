import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'

import { MulterModule } from '@nestjs/platform-express'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { DatabaseModule } from './database/database.module'

import { CarModule } from './app/car/car.module'
import { AddressModule } from './app/address/address.module'
import { ClassModule } from './app/class/class.module'
import { DriverModule } from './app/driver/driver.module'
import { RaceModule } from './app/race/race.module'
import { TeamModule } from './app/team/team.module'
import { RaceResultModule } from './app/race-result/race-result.module'

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload'
      })
    }),
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
