import {
  Controller, Get, Post, Body, Patch, Param, Delete
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MzSwaggerAuth } from '../common/decorator/swagger-auth.decorator'
import { DriverService } from './driver.service'
import { CreateDriverDto } from './dto/create-driver.dto'
import { UpdateDriverDto } from './dto/update-driver.dto'

@ApiTags('drivers')
@MzSwaggerAuth()
@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto)
  }

  @Get()
  findAll() {
    return this.driverService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id)
  }
}
