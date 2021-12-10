import { ApiProperty } from '@nestjs/swagger'

export class CreateCarDto {
  id?: string

  @ApiProperty()
    name?: string

  @ApiProperty()
    make?: string

  @ApiProperty()
    model?: string

  @ApiProperty()
    class?: string

  @ApiProperty()
    team?: string

  @ApiProperty()
    results?: string[]
}
