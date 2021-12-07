import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { ObjectSchema } from 'joi'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) { // metadata: ArgumentMetadata
    const { error } = this.schema.validate(value)
    if (error) {
      const message = error.details.map((i) => i.message).join(', ')
      throw new BadRequestException(message)
    }
    return value
  }
}
