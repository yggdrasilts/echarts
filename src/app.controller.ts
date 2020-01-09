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
import * as Joi from '@hapi/joi';

import { JoiValidationPipe } from './pipes/joi.validation.pipe';

import { EchartsService } from './echarts/echarts.service';
import { Options } from './echarts/options.interface';

@Controller()
export class AppController {
  constructor(private readonly echartsService: EchartsService) {}

  @Post('/image')
  @Header('Content-Type', 'image/png')
  @Header('Content-disposition', 'attachment;filename=echarts.png')
  @UsePipes(
    new JoiValidationPipe(
      Joi.object({
        echartOptions: Joi.object().required(),
      }),
    ),
  )
  @ApiOperation({ summary: 'Get the image.' })
  async getImage(@Body() opt: Options, @Res() response: Response) {
    Logger.debug(`Incoming options: ${JSON.stringify(opt)}`);
    const result = await this.echartsService.getImage(opt);
    response.setHeader('Content-Length', result.length);
    response.setHeader(
      'Content-disposition',
      `attachment;filename=${opt.options.filename || 'echarts.png'}`,
    );
    response.end(result);
  }
}
