import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, HttpCode
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import * as Joi from 'joi'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { JoiValidationPipe } from '../common/validation.pipe'

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(new JoiValidationPipe({
    body: Joi.object({
      name: Joi.string().required(),
      street: Joi.string().allow(null, ''),
      street2: Joi.string().allow(null, ''),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
      country: Joi.string().required()
    })
  }))
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto)
  }

  @Get()
  @UsePipes(new JoiValidationPipe({
    query: Joi.object({ // NOTE: not the final solution, just a quick test
      pageSize: Joi.number().integer().min(1).max(50)
        .default(10),
      currentPage: Joi.number().integer().min(1).default(1)
    })
  }))
  findAll(@Query() query: any) { // TODO: clarify query param, avoid using "any"
    console.log('query', query)
    return this.addressService.findAll({
      pagination: {
        pageSize: query.pageSize,
        currentPage: query.currentPage
      }
    })
  }

  @Get(':id')
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
  @ApiResponse({ status: 204, description: 'No Content' })
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto)
  }

  @Patch(':id/results/:resultId')
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required(),
      resultId: Joi.string().guid().required()
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
  @ApiResponse({ status: 204, description: 'No Content' })
  @HttpCode(204)
  getResult(@Param() params: { id: string, resultId: string }, @Body() updateAddressDto: UpdateAddressDto) {
    console.log('params.resultId', params.resultId)
    return this.addressService.update(params.id, updateAddressDto)
  }

  @Delete(':id')
  @UsePipes(new JoiValidationPipe({
    param: Joi.object({
      id: Joi.string().guid().required()
    })
  }))
  @ApiResponse({ status: 204, description: 'No Content' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.addressService.remove(id)
  }
}
