import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  DeleteResult, InsertResult, Repository, UpdateResult
} from 'typeorm'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { Class } from './entities/class.entity'

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private readonly repository: Repository<Class>
  ) {}

  create(createClassDto: CreateClassDto | Array<CreateClassDto>): Promise<InsertResult> {
    return this.repository.insert(createClassDto)
  }

  async findAll(): Promise<Array<Class>> {
    const result = await this.repository.find()
    return result
  }

  async findOne(id: string): Promise<Class> {
    const result = await this.repository.findOne(id)
    return result
  }

  update(id: string, updateClassDto: UpdateClassDto): Promise<UpdateResult> {
    return this.repository.update(id, updateClassDto)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.repository.delete(id)
  }
}
