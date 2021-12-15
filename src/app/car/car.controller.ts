import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MzSwaggerAuth } from '../common/decorator/swagger-auth.decorator'
import { CarService } from './car.service'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'

@ApiTags('cars')
@MzSwaggerAuth()
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto)
  }

  @Get()
  findAll() {
    return this.carService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id)
  }
}
