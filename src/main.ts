import { NestFactory } from '@nestjs/core'
import { VersioningType } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api') // https://example.com/api/...
  app.enableVersioning({ // https://example.com/api/v1/route or https://example.com/api/v2/route.
    type: VersioningType.URI,
    defaultVersion: '1'
  })
  await app.listen(3000)
}
bootstrap()
