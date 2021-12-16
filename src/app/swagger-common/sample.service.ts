import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseService } from '../common/base.service'
import { LoggerService } from '../../logger/custom.logger'
import { Sample } from './sample.entity'

@Injectable()
export class SampleService extends BaseService<Sample> {
  constructor(
    @InjectRepository(Sample) private readonly repo: Repository<Sample>,
    logger: LoggerService
  ) {
    super(repo, logger)
  }
}
