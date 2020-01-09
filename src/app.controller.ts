import {
  Controller,
  Post,
  Body,
  Header,
  Res,
  UsePipes,
  Logger,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { AppService } from './app.service';
import { EChartOption } from 'echarts';
import { JoiValidationPipe } from './pipes/joi.validation.pipe';

import * as Joi from '@hapi/joi';

const schema = Joi.object({
  body: {
    options: Joi.object().required(),
  },
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/image')
  @Header('Content-Type', 'image/png')
  @Header('Content-disposition', 'attachment;filename=echarts.png')
  @UsePipes(new JoiValidationPipe(schema))
  @ApiOperation({ summary: 'Get the image.' })
  async getImage(@Body() options: EChartOption, @Res() response: Response) {
    Logger.debug(`Incoming options: ${JSON.stringify(options)}`);
    const result = await this.appService.getImage(options);
    response.setHeader('Content-Length', result.length);
    response.end(result);
  }
}
