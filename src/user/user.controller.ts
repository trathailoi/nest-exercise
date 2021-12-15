import {
  Controller, Post, Body, HttpCode, HttpStatus, UsePipes, BadRequestException
} from '@nestjs/common'
import {
  ApiTags, ApiBody, ApiCreatedResponse
} from '@nestjs/swagger'
import * as Joi from 'joi'
import { Mapper } from '../app/common/mapper'
import { MzPublic } from '../app/common/decorator/public.decorator'
import { JoiValidationPipe } from '../app/common/validation.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mapper: Mapper
  ) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'firstName', 'lastName', 'password'],
      properties: {
        email: { type: 'email', example: 'somebody@hotmail.com' },
        firstName: { type: 'string', example: 'Tom' },
        lastName: { type: 'string', example: 'Cruise' },
        password: { type: 'string', example: 'youknowwhatitis' }
      }
    }
  })
  @ApiCreatedResponse({})
  @MzPublic()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required()
    })
  }))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(this.mapper.map(CreateUserDto, User, createUserDto))
      return result.identifiers[0]
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
