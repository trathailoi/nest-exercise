import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Address } from './address.entity'

import { BaseService } from '../common/base.service'
import { LoggerService } from '../../logger/custom.logger'

@Injectable()
export class AddressService extends BaseService<Address> {
  constructor(
    @InjectRepository(Address) private readonly repo: Repository<Address>,
    logger: LoggerService
  ) {
    super(repo, logger)
  }
}
