import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';

import { Schema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  private readonly logger = new Logger(JoiValidationPipe.name);

  constructor(private readonly schema: Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug(`Input body: ${JSON.stringify(value)}`);
    const { error } = this.schema.validate(value);
    if (error) {
      this.logger.error(`Error validating body: ${JSON.stringify(error)}`);
      throw new BadRequestException(`Validation failed: ${error.message}`);
    }
    return value;
  }
}
