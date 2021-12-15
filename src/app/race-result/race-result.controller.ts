import {
  Controller, Get, Post, Body, Patch, Param, Delete
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MzSwaggerAuth } from '../common/decorator/swagger-auth.decorator'
import { RaceResultService } from './race-result.service'
import { CreateRaceResultDto } from './dto/create-race-result.dto'
import { UpdateRaceResultDto } from './dto/update-race-result.dto'

@ApiTags('race-results')
@MzSwaggerAuth()
@Controller('race-results')
export class RaceResultController {
  constructor(private readonly raceResultService: RaceResultService) {}

  @Post()
  create(@Body() createRaceResultDto: CreateRaceResultDto) {
    return this.raceResultService.create(createRaceResultDto)
  }

  @Get()
  findAll() {
    return this.raceResultService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raceResultService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaceResultDto: UpdateRaceResultDto) {
    return this.raceResultService.update(+id, updateRaceResultDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raceResultService.remove(+id)
  }
}
