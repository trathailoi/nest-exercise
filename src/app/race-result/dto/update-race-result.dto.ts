import { PartialType } from '@nestjs/swagger'
import { CreateRaceResultDto } from './create-race-result.dto'

export class UpdateRaceResultDto extends PartialType(CreateRaceResultDto) {}
