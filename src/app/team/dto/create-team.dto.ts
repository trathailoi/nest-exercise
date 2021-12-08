enum Nationality {
  USA = 'USA',
  VietNam = 'Viet Nam'
}
export class CreateTeamDto {
  id?: string

  name?: string

  nationality?: Nationality

  businessAddress?: string

  cars?: string[]
}
