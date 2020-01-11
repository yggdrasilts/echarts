import { Controller, Post, Body, Header, Res, UsePipes, Logger } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { JoiValidationPipe } from './pipes/joi.validation.pipe';

import { EchartsService } from './echarts/echarts.service';
import { Options } from './echarts/entities/options.class';
import { imageBodyValidationSchema, DEFAULT_FILENAME } from './echarts/constants';
import { ApiRoutes } from './api/api.routes';

import { HttpHeaders, MimeType } from './utils/net';

@ApiTags('echarts')
@Controller()
export class AppController {
  constructor(private readonly echartsService: EchartsService) {}

  @Post(ApiRoutes.POST.IMAGE)
  @Header(HttpHeaders.CONTENT_TYPE, MimeType.IMAGE.PNG)
  @UsePipes(new JoiValidationPipe(imageBodyValidationSchema))
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiCreatedResponse({ type: Buffer, description: 'The image is successfully returned.' })
  async getImage(@Body() opt: Options, @Res() response: Response) {
    Logger.debug(`[AppController] Incoming options: ${JSON.stringify(opt)}`);
    const result = await this.echartsService.getImage(opt);
    response.setHeader(HttpHeaders.CONTENT_LENGTH, result.length);
    response.setHeader(HttpHeaders.CONTENT_DISPOSITION, `attachment;filename=${opt.options?.filename || DEFAULT_FILENAME}`);
    Logger.debug(`[AppController] Send Result.`);
    response.end(result);
  }
}
