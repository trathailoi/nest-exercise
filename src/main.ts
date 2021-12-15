/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core'
import { VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { appConfig } from './app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api') // http://localhost:3000/api/...
  app.enableVersioning({ // http://localhost:3000/api/v1.0/...
    type: VersioningType.URI,
    defaultVersion: appConfig.getApiVersion()
  })

  console.log('appConfig.isProduction()', appConfig.isProduction())
  if (!appConfig.isProduction()) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Mazi API')
      .setDescription('Mazi API\'s documentation')
      .setVersion(appConfig.getApiVersion())
      .addBearerAuth()
      .addTag('authen')
      .addTag('users')
      .addTag('addresses')
      .addTag('classes')
      .addTag('teams')
      .addTag('drivers')
      .addTag('cars')
      .addTag('races')
      .addTag('race-results')
      .build())
    SwaggerModule.setup('api', app, document)
  }

  app.enableCors()
  await app.listen(appConfig.getPort())
}
bootstrap()
