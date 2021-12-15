import {
  Controller, Get, Post, Body, Patch, Param, Delete
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MzSwaggerAuth } from '../common/decorator/swagger-auth.decorator'
import { RaceService } from './race.service'
import { CreateRaceDto } from './dto/create-race.dto'
import { UpdateRaceDto } from './dto/update-race.dto'

@ApiTags('races')
@MzSwaggerAuth()
@Controller('races')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post()
  create(@Body() createRaceDto: CreateRaceDto) {
    return this.raceService.create(createRaceDto)
  }

  @Get()
  findAll() {
    return this.raceService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.raceService.update(+id, updateRaceDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceService.remove(+id)
  }
}
