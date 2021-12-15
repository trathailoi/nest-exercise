import {
  Controller, Get, Post, Body, Patch, Param, Delete
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { TeamService } from './team.service'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { MzSwaggerAuth } from '../common/decorator/swagger-auth.decorator'
import { Team } from './team.entity'

@ApiTags('teams')
@MzSwaggerAuth()
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto)
  }

  @Get()
  findAll() {
    return this.teamService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({
    type: Team
  })
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id)
  }
}
