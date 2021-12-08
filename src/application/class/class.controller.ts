import {
  Controller,
  Get, Post, Patch, Delete,
  Param, Body, HttpCode,
  ParseUUIDPipe,
  UsePipes,
  BadRequestException, NotFoundException, UploadedFile, UseInterceptors, Req, Version
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import * as Joi from 'joi'
import { diskStorage } from 'multer'

import * as path from 'path'
import { JoiValidationPipe } from '../common/validation.pipe'
import { ClassService } from './class.service'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'

@ApiTags('classes')
@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      name: Joi.string().max(50).required()
    })
  }))
  @HttpCode(201)
  async create(@Body() createClassDto: CreateClassDto) {
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
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    })
  }))
  async findOne(@Param('id') id: string) {
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
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    }),
    body: Joi.object({
      name: Joi.string().max(50).required()
    })
  }))
  @HttpCode(204)
  async update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
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
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    })
  }))
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

  // eslint-disable-next-line class-methods-use-this
  @Post('upload')
  @Version(['1', '2'])
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const fileExt: string = path.extname(file.originalname)
        const fileName: string = path.basename(file.originalname, fileExt)
        cb(null, path.join(`${fileName}_${Date.now().toString()}${fileExt}`))
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        req.fileValidationError = 'Only support image files'
        return cb(null, false)
      }
      return cb(null, true)
    },
    limits: { fileSize: 1024 * 1024 } // 1MB
  }))
  uploadfile(@Req() req, @UploadedFile() file: Express.Multer.File) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError)
    }
    if (!file) {
      throw new BadRequestException('invalid file')
    }
    return file
  }
}
