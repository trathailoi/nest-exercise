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
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto)
  }

  @Get()
  @UsePipes(new JoiValidationPipe(Joi.object({ // NOTE: not the final solution, just a quick test
    pageSize: Joi.number().integer().min(1).max(50)
      .default(10),
    currentPage: Joi.number().integer().min(1).default(1)
  })))
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
  @ApiResponse({ status: 204, description: 'No Content' })
  @HttpCode(204)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto)
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'No Content' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.addressService.remove(id)
  }
}
