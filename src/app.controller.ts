import { Controller, Post, Body, Header, Res, UsePipes, Logger } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

import { JoiValidationPipe } from './pipes/joi.validation.pipe';

import { EchartsService } from './echarts/echarts.service';
import { Options } from './echarts/options.interface';
import { imageBodyValidationSchema } from './echarts/constants';
import { ApiRoutes } from './api/api.routes';

import { HTTP } from './utils/http.constants';

@Controller()
export class AppController {
  constructor(private readonly echartsService: EchartsService) {}

  @Post(ApiRoutes.POST.IMAGE)
  @Header(HTTP.Header.CONTENT_TYPE, HTTP.ContentType.IMAGE.PNG)
  @Header(HTTP.Header.CONTENT_DISPOSITION, 'attachment;filename=echarts.png')
  @UsePipes(new JoiValidationPipe(imageBodyValidationSchema))
  @ApiOperation({ summary: 'Get the image.' })
  async getImage(@Body() opt: Options, @Res() response: Response) {
    Logger.debug(`Incoming options: ${JSON.stringify(opt)}`);
    const result = await this.echartsService.getImage(opt);
    response.setHeader(HTTP.Header.CONTENT_LENGTH, result.length);
    response.setHeader(HTTP.Header.CONTENT_DISPOSITION, `attachment;filename=${opt.options?.filename || 'echarts.png'}`);
    response.end(result);
  }
}
