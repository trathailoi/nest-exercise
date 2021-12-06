enum Nationality {
  USA = 'USA',
  VietNam = 'Viet Nam'
}
export class CreateDriverDto {
  id?: string

  firstName?: string

  lastName?: string

  nationality?: Nationality

  homeAddress?: string

  managementAddress?: string

  teams?: string[]

  results?: string[]
}
