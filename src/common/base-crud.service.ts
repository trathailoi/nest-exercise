// import { DeleteResult, Repository } from 'typeorm'
// import { InjectRepository } from '@nestjs/typeorm'

// import { Type, Inject } from '@nestjs/common'
// import type { Mapper } from '../common/mapper'

// // class CrudService<T> {
// //   constructor(
// //     @InjectRepository(T) protected repository: Repository<T>
// //   ) { }
// //   //   constructor(protected repository: Repository<T>) { }

// //   public async findById(id: string): Promise<T | undefined> {
// //     return this.repository.findOne(id)
// //   }

// //   public async findByIds(ids: T[]): Promise<Array<T>> {
// //     return this.repository.findByIds(ids)
// //   }

// //   public async findAll(queryObject?: { where?, relations?: string[], pagination?: { pageSize?: number, currentPage?: number }, order? }): Promise<{ data: Array<T>, count: number }> {
// //     const defaultPaginationConf = { take: 20, skip: 0 } // skip: take * (page - 1)
// //     let queryObj = {}
// //     if (queryObject?.where && Object.keys(queryObject?.where).length > 0) {
// //       queryObj = { ...queryObj, where: queryObject?.where }
// //     }
// //     if (queryObject?.relations && queryObject?.relations.length > 0) {
// //       queryObj = { ...queryObj, relations: queryObject?.relations }
// //     }
// //     if (queryObject?.pagination && Object.keys(queryObject?.pagination).length > 0) {
// //       if (queryObject.pagination.pageSize) {
// //         defaultPaginationConf.take = queryObject.pagination.pageSize
// //       }
// //       if (queryObject.pagination.currentPage) {
// //         defaultPaginationConf.skip = defaultPaginationConf.take * (queryObject.pagination.currentPage - 1)
// //       }
// //       queryObj = { ...queryObj, ...defaultPaginationConf }
// //       // just for reference: this.repository.find({ take, skip: take * (page - 1) });
// //     }
// //     if (queryObject?.order && Object.keys(queryObject?.order).length > 0) {
// //       queryObj = { ...queryObj, order: queryObject?.order }
// //       // TODO: order by multiple fields
// //       // this.repository.findAndCount({
// //       //     order: {
// //       //         name: 'ASC',
// //       //         id: 'DESC'
// //       //     }
// //       // })
// //     }
// //     console.log('queryObj', queryObj)
// //     const result = await this.repository.findAndCount(queryObj)
// //     return {
// //       data: result[0],
// //       count: result[1]
// //     }
// //   }

// //   public async update(entity: T): Promise<T | undefined> {
// //     return this.repository.save(entity)
// //   }

// //   public async saveMany(entities: Array<T>): Promise<Array<T>> {
// //     return this.repository.save(entities)
// //   }

// //   public async remove(id: string): Promise<DeleteResult> {
// //     return this.repository.delete(id)
// //   }

// //   //   public async create(dto: U): Promise<U> {
// //   //     return this.repository.save(U.toEntity(dto)).then(e => U.fromEntity(e));
// //   //   }

// //   //   findOne(id: number) {
// //   //     return `This action returns a #${id} address`
// //   //   }

// //   //   update(id: number, dto: V) {
// //   //     return `This action updates a #${id} address ${dto}`
// //   //   }

// // //   remove(id: number) {
// // //     return `This action removes a #${id} address`
// // //   }
// // }

// // export { CrudService }

// export interface ICrudService<T> {
//   readonly repository: Repository<T>
// }

// type Constructor<I> = new (...args: any[]) => I // Main Point

// export function CrudService<T>(entity: Constructor<T>): Type<ICrudService<T>> {
//   class CrudServiceHost implements ICrudService<T> {
//     constructor(
//       @InjectRepository(entity) public readonly repository: Repository<T>,
//       @Inject('MAPPER') private readonly mapper: Mapper
//     ) { }
//     // @InjectRepository(entity) public readonly repository: Repository<T>

//     public async findById(id: string): Promise<T | undefined> {
//       return this.repository.findOne(id)
//     }

//     public async findByIds(ids: T[]): Promise<Array<T>> {
//       return this.repository.findByIds(ids)
//     }

//     public async findAll(queryObject?: { where?, relations?: string[], pagination?: { pageSize?: number, currentPage?: number }, order? }): Promise<{ data: Array<T>, count: number }> {
//       const defaultPaginationConf = { take: 20, skip: 0 } // skip: take * (page - 1)
//       let queryObj = {}
//       if (queryObject?.where && Object.keys(queryObject?.where).length > 0) {
//         queryObj = { ...queryObj, where: queryObject?.where }
//       }
//       if (queryObject?.relations && queryObject?.relations.length > 0) {
//         queryObj = { ...queryObj, relations: queryObject?.relations }
//       }
//       if (queryObject?.pagination && Object.keys(queryObject?.pagination).length > 0) {
//         if (queryObject.pagination.pageSize) {
//           defaultPaginationConf.take = queryObject.pagination.pageSize
//         }
//         if (queryObject.pagination.currentPage) {
//           defaultPaginationConf.skip = defaultPaginationConf.take * (queryObject.pagination.currentPage - 1)
//         }
//         queryObj = { ...queryObj, ...defaultPaginationConf }
//         // just for reference: this.repository.find({ take, skip: take * (page - 1) });
//       }
//       if (queryObject?.order && Object.keys(queryObject?.order).length > 0) {
//         queryObj = { ...queryObj, order: queryObject?.order }
//         // TODO: order by multiple fields
//         // this.repository.findAndCount({
//         //     order: {
//         //         name: 'ASC',
//         //         id: 'DESC'
//         //     }
//         // })
//       }
//       console.log('queryObj', queryObj)
//       const result = await this.repository.findAndCount(queryObj)
//       return {
//         data: result[0],
//         count: result[1]
//       }
//     }

//     public async update(ent: T): Promise<T | undefined> {
//       return this.repository.save(ent)
//     }

//     public async saveMany(entities: Array<T>): Promise<Array<T>> {
//       return this.repository.save(entities)
//     }

//     public async remove(id: string): Promise<DeleteResult> {
//       return this.repository.delete(id)
//     }
//   }
//   return CrudServiceHost
// }
