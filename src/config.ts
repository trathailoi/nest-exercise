import { TypeOrmModuleOptions } from '@nestjs/typeorm'

require('dotenv').config()

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key]
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`)
    }

    return value
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true))
    return this
  }

  public getPort() {
    return this.getValue('PORT', true)
  }

  public getApiVersion() {
    return this.getValue('API_VERSION', true)
  }

  public isProduction() {
    const mode = this.getValue('MODE', false)
    return mode !== 'DEV'
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: Number(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),

      entities: ['**/*.entity{.ts,.js}'],

      // migrationsTableName: 'migration',

      migrations: ['src/database/migration/*.ts'],

      cli: {
        migrationsDir: 'src/database/migration'
      },

      ssl: this.isProduction()
    }
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB'
  ])

export { configService }
