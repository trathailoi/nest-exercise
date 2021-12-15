import { ApiProperty } from '@nestjs/swagger'

export class CreateClassDto {
  id: string

  @ApiProperty({ example: 'GTE PRO' })
    name: string
}
