import { ApiProperty } from '@nestjs/swagger'
import { Address } from '../address.entity'

export class CreateAddressDto implements Readonly<CreateAddressDto> {
  id: string

  @ApiProperty({ example: 'John Doe' })
    name: string

  @ApiProperty({ example: '123 Main St' })
    street: string

  @ApiProperty({ example: 'Apt. 1' })
    street2: string

  @ApiProperty({ example: 'Anytown' })
    city: string

  @ApiProperty({ example: 'CA' })
    state: string

  @ApiProperty({ example: '12345' })
    zip: string

  @ApiProperty({ example: 'United States' })
    country: string

  public static from(dto: Partial<CreateAddressDto>) {
    const it = new CreateAddressDto()
    it.id = dto.id
    it.name = dto.name
    it.street = dto.street
    it.street2 = dto.street2
    it.city = dto.city
    it.state = dto.state
    it.zip = dto.zip
    it.country = dto.country
    return it
  }

  public static fromEntity(entity: Address) {
    return this.from({
      id: entity.id,
      name: entity.name,
      street: entity.street,
      street2: entity.street2,
      city: entity.city,
      state: entity.state,
      zip: entity.zip,
      country: entity.country
    })
  }

  public static toEntity(dto: Partial<CreateAddressDto>) {
    const it = new Address()
    it.id = dto.id
    it.name = dto.name
    it.street = dto.street
    it.street2 = dto.street2
    it.city = dto.city
    it.state = dto.state
    it.zip = dto.zip
    it.country = dto.country
    it.createdAt = new Date()
    // it.createdBy = user ? user.id : null
    // it.lastChangedBy = user ? user.id : null
    return it
  }
}
