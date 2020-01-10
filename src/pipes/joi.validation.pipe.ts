import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';

import { EChartOption } from 'echarts';

import { Schema } from '@hapi/joi';

class InnerEchartsOptions implements EChartOption {}

// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class JoiValidationPipe implements PipeTransform {
  private readonly options: EChartOption;

  constructor(private readonly schema: Schema) {
    this.options = new InnerEchartsOptions();
  }

  transform(value: any, metadata: ArgumentMetadata) {
    Logger.debug(`[JoiValidationPipe] - options ${JSON.stringify(this.options)}`);
    Logger.debug(`[JoiValidationPipe] - value ${JSON.stringify(value)}`);
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
