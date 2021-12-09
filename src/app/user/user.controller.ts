import {
  Controller, Post, Body, HttpCode, UsePipes, BadRequestException
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import * as Joi from 'joi'
import { Mapper } from '../common/mapper'
import { Public } from '../common/public.decorator'
import { JoiValidationPipe } from '../common/validation.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mapper: Mapper
  ) {}

  @Post()
  @Public()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required()
    })
  }))
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(this.mapper.map(CreateUserDto, User, createUserDto))
      return result
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
