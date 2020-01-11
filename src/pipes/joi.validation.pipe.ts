import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';

import { Schema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    Logger.debug(`[JoiValidationPipe] - value ${JSON.stringify(value)}`);
    const { error } = this.schema.validate(value);
    if (error) {
      Logger.error(`[JoiValidationPipe] - ERROR: ${JSON.stringify(error)}`);
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
