import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, HttpCode, Inject
} from '@nestjs/common'
import {
  ApiOkResponse, ApiNoContentResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiTags,
  ApiQuery, ApiBody
} from '@nestjs/swagger'
import * as Joi from 'joi'
import { Address } from './entities/address.entity'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { JoiValidationPipe } from '../common/validation.pipe'

import type { Mapper } from '../common/mapper'

@ApiTags('addresses')
@Controller('addresses')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    @Inject('MAPPER') private readonly mapper: Mapper
  ) {}

  @Post()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      name: Joi.string().max(150).required(),
      street: Joi.string().allow(null, ''),
      street2: Joi.string().allow(null, ''),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
      country: Joi.string().required()
    })
  }))
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.save(this.mapper.map(CreateAddressDto, Address, createAddressDto))
  }

  @Get()
  @UsePipes(new JoiValidationPipe({
    query: Joi.object({
      pageSize: Joi.number().integer().min(1).max(50)
        .default(10),
      currentPage: Joi.number().integer().min(1).default(1)
    })
  }))
  @ApiQuery({
    name: 'pageSize', required: false, schema: { minimum: 1, maximum: 50 }, description: 'Page size.'
  })
  @ApiQuery({
    name: 'currentPage', required: false, schema: { minimum: 1 }, description: 'Current page.'
  })
  @ApiOkResponse({
    isArray: true,
    schema: {
      type: 'array',
      items: {
        properties: {
          count: { type: 'number' },
          data: {
            type: 'array',
            items: {
              type: 'object'
            }
          }
        }
      }
    }
  })
  findAll(@Query('pageSize') pageSize: number, @Query('currentPage') currentPage: number) {
    return this.addressService.findAll({
      pagination: {
        pageSize,
        currentPage
      }
    })
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiOkResponse()
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(id)
  }

  @Patch(':id')
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    }),
    body: Joi.object({
      name: Joi.string(),
      street: Joi.string().allow(null, ''),
      street2: Joi.string().allow(null, ''),
      city: Joi.string(),
      state: Joi.string(),
      zip: Joi.string(),
      country: Joi.string()
    })
  }))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        street: { type: 'string', example: '123 Main St.' },
        street2: { type: 'string', example: 'Apt. 1' },
        city: { type: 'string', example: 'Anytown' },
        state: { type: 'string', example: 'CA' },
        zip: { type: 'string', example: '12345' },
        country: { type: 'string', example: 'USA' }
      }
    }
  })
  @ApiBadRequestResponse({ description: 'The request is not valid.' })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiNoContentResponse({ description: 'The address has been updated' })
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.save(this.mapper.map(UpdateAddressDto, Address, { ...updateAddressDto, id }))
  }

  // @Patch(':id/results/:resultId')
  // @UsePipes(new JoiValidationPipe({
  //   param: Joi.object({
  //     id: Joi.string().guid(),
  //     resultId: Joi.string().guid()
  //   }),
  //   body: Joi.object({
  //     name: Joi.string(),
  //     street: Joi.string().allow(null, ''),
  //     street2: Joi.string().allow(null, ''),
  //     city: Joi.string(),
  //     state: Joi.string(),
  //     zip: Joi.string(),
  //     country: Joi.string()
  //   })
  // }))
  // @ApiNoContentResponse()
  // @ApiNotFoundResponse({ description: 'Not found.' })
  // @HttpCode(204)
  // getResult(@Param('id') id: string, @Param('resultId') resultId: string, @Body() updateAddressDto: UpdateAddressDto) {
  //   console.log('resultId', resultId)
  //   return this.addressService.save(this.mapper.map(UpdateAddressDto, Address, { ...updateAddressDto, id }))
  // }

  @Delete(':id')
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    })
  }))
  @ApiBadRequestResponse({ description: 'The request is not valid.' })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @ApiNoContentResponse({ description: 'The address has been deleted' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.addressService.delete(id)
  }
}
