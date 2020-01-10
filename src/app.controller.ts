import { Controller, Post, Body, Header, Res, UsePipes, Logger } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { JoiValidationPipe } from './pipes/joi.validation.pipe';

import { EchartsService } from './echarts/echarts.service';
import { Options } from './echarts/options.interface';
import { imageBodyValidationSchema } from './echarts/constants';
import { ApiRoutes } from './api/api.routes';

import { HTTP } from './utils/http.constants';
import { MediaTypeObject, EncodingPropertyObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const t3: Record<string, EncodingPropertyObject> = {
  dos: { contentType: HTTP.MimeType.IMAGE.PNG },
};

const test: Record<string, MediaTypeObject> = {
  uno: { encoding: t3 },
};
@ApiTags('echarts')
@Controller()
export class AppController {
  constructor(private readonly echartsService: EchartsService) {}

  @Post(ApiRoutes.POST.IMAGE)
  @Header(HTTP.Header.CONTENT_TYPE, HTTP.MimeType.IMAGE.PNG)
  @Header(HTTP.Header.CONTENT_DISPOSITION, 'attachment;filename=echarts.png')
  @UsePipes(new JoiValidationPipe(imageBodyValidationSchema))
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiCreatedResponse({ type: Buffer, description: 'The image is successfully returned.' })
  async getImage(@Body() opt: Options, @Res() response: Response) {
    Logger.debug(`Incoming options: ${JSON.stringify(opt)}`);
    const result = await this.echartsService.getImage(opt);
    response.setHeader(HTTP.Header.CONTENT_LENGTH, result.length);
    response.setHeader(HTTP.Header.CONTENT_DISPOSITION, `attachment;filename=${opt.options?.filename || 'echarts.png'}`);
    response.end(result);
  }
}
