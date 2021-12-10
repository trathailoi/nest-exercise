import { ApiProperty } from '@nestjs/swagger'

export class CreateClassDto {
  id: string

  @ApiProperty()
    name: string
}
