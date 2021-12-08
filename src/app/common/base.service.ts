import { DeleteResult, Repository } from 'typeorm'
import { EntityId } from 'typeorm/repository/EntityId'
import { LoggerService } from '../../logger/custom.logger'

export class BaseService<T> {
  protected readonly repository: Repository<T>

  protected readonly logger: LoggerService

  constructor(repository: Repository<T>, logger: LoggerService) {
    this.repository = repository
    this.logger = logger
  }

  async save(entity: T): Promise<T | undefined> {
    return this.repository.save(entity)
  }

  async findAll(queryObject?: { where?, relations?: string[], pagination?: { pageSize?: number, currentPage?: number }, order? }): Promise<{ data: Array<T>, count: number }> {
    const defaultPaginationConf = { take: 20, skip: 0 } // skip: take * (page - 1)
    let queryObj = {}
    if (queryObject?.where && Object.keys(queryObject?.where).length > 0) {
      queryObj = { ...queryObj, where: queryObject?.where }
    }
    if (queryObject?.relations && queryObject?.relations.length > 0) {
      queryObj = { ...queryObj, relations: queryObject?.relations }
    }
    if (queryObject?.pagination && Object.keys(queryObject?.pagination).length > 0) {
      if (queryObject.pagination.pageSize) {
        defaultPaginationConf.take = queryObject.pagination.pageSize
      }
      if (queryObject.pagination.currentPage) {
        defaultPaginationConf.skip = defaultPaginationConf.take * (queryObject.pagination.currentPage - 1)
      }
      queryObj = { ...queryObj, ...defaultPaginationConf }
      // just for reference: this.repository.find({ take, skip: take * (page - 1) });
    }
    if (queryObject?.order && Object.keys(queryObject?.order).length > 0) {
      queryObj = { ...queryObj, order: queryObject?.order }
      // TODO: order by multiple fields
      // this.repository.findAndCount({
      //     order: {
      //         name: 'ASC',
      //         id: 'DESC'
      //     }
      // })
    }
    console.log('queryObj', queryObj)
    const result = await this.repository.findAndCount(queryObj)
    return {
      data: result[0],
      count: result[1]
    }
  }

  findOne(id: EntityId): Promise<T | undefined> {
    return this.repository.findOne(id)
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(ids)
  }

  async saveMany(entities: Array<T>): Promise<Array<T>> {
    return this.repository.save(entities)
  }

  async delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id)
  }
}