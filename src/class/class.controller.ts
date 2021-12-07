import {
  Controller,
  Get, Post, Patch, Delete,
  Param, Body, HttpCode,
  ParseUUIDPipe,
  BadRequestException, NotFoundException
} from '@nestjs/common'
import * as Joi from 'joi'
import { JoiValidationPipe } from '../common/validation.pipe'
import { ClassService } from './class.service'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @HttpCode(201)
  async create(@Body(new JoiValidationPipe(Joi.object().keys({
    name: Joi.string().max(50).required()
  }))) createClassDto: CreateClassDto) {
    try {
      const result = await this.classService.create(createClassDto)
      return result
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.classService.findAll()
      return result
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    let result
    try {
      result = await this.classService.findOne(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
    if (!result) {
      throw new NotFoundException()
    }
    return result
  }

  @Patch(':id')
  @HttpCode(204)
  async update(
  @Param('id', ParseUUIDPipe) id: string,
    @Body(new JoiValidationPipe(Joi.object().keys({
      name: Joi.string().max(50).required()
    }))) updateClassDto: UpdateClassDto
  ) {
    let result
    try {
      result = await this.classService.update(id, updateClassDto)
    } catch (error) {
      throw new BadRequestException(error)
    }
    if (!result.affected) {
      throw new NotFoundException()
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    let result
    try {
      result = await this.classService.remove(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
    if (!result.affected) {
      throw new NotFoundException()
    }
  }
}
