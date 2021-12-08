import { NestFactory } from '@nestjs/core'
import { VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { configService } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api') // https://example.com/api/...
  app.enableVersioning({ // https://example.com/api/v1/route or https://example.com/api/v2/route.
    type: VersioningType.URI,
    defaultVersion: configService.getApiVersion()
  })

  console.log('configService.isProduction()', configService.isProduction())
  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Mazi API')
      .setDescription('Mazi API\'s documentation')
      .setVersion(configService.getApiVersion())
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
  await app.listen(configService.getPort())
}
bootstrap()
