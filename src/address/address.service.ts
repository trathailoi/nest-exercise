import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeleteResult } from 'typeorm'
import type { Mapper } from '../common/mapper'
// import { CrudService } from '../common/base-crud.service'

import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { Address } from './entities/address.entity'

@Injectable()
export class AddressService { // extends CrudService(Address)
  constructor(
    @InjectRepository(Address) private readonly repo: Repository<Address>,
    @Inject('MAPPER') private readonly mapper: Mapper
  ) { }

  public async create(dto: CreateAddressDto): Promise<CreateAddressDto> {
    return this.repo.save(this.mapper.map(CreateAddressDto, Address, dto)).then((res) => this.mapper.map(Address, CreateAddressDto, res))
  }

  // public async findAll(): Promise<CreateAddressDto[]> {
  //   return this.repo.find().then((items) => items.map((e) => CreateAddressDto.fromEntity(e)))
  // }
  public async findAll(queryObject?: { where?, relations?: string[], pagination?: { pageSize?: number, currentPage?: number }, order? }): Promise<{ data: Array<Address>, count: number }> {
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
    const result = await this.repo.findAndCount(queryObj)
    return {
      data: result[0],
      count: result[1]
    }
  }

  findOne(id: string) {
    return this.repo.findOne(id).then((e) => CreateAddressDto.fromEntity(e))
  }

  update(id: string, dto: UpdateAddressDto) {
    const address = this.mapper.map(UpdateAddressDto, Address, dto)
    address.id = id
    // console.log('this.mapper', this.mapper)
    return this.repo.save(address)
  }

  public async remove(id: string): Promise<DeleteResult> {
    return this.repo.delete(id)
  }
}
