import { Controller, Post, Body, Header, Res, UsePipes, Logger } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { Response } from 'express';

import { HttpHeaders, MimeType } from '@yggdrasilts/volundr';

import { ApiRoutes } from './api/api.routes';

import { BodyValidationPipe } from './pipes/body.validation.pipe';

import { EchartsService } from './echarts/echarts.service';
import { Options } from './echarts/entities/options.class';
import { IMAGE_BODY_VALIDATION_SCHEMA, DEFAULT_FILENAME } from './echarts/constants';

@ApiTags('echarts')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly echartsService: EchartsService) {}

  @Post(ApiRoutes.POST.IMAGE)
  @Header(HttpHeaders.CONTENT_TYPE, MimeType.IMAGE.PNG)
  @UsePipes(new BodyValidationPipe(IMAGE_BODY_VALIDATION_SCHEMA))
  @ApiOperation({ description: 'Gets an echarts image as attachment.' })
  @ApiProduces(MimeType.IMAGE.PNG)
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiCreatedResponse({ type: Buffer, description: 'The image is successfully returned.' })
  async getImage(@Body() opt: Options, @Res() response: Response): Promise<void> {
    this.logger.debug(`Incoming options: ${JSON.stringify(opt)}`);
    const result = await this.echartsService.getImage(opt);
    response.setHeader(HttpHeaders.CONTENT_LENGTH, result.length);
    response.setHeader(HttpHeaders.CONTENT_DISPOSITION, `attachment;filename=${opt.options?.filename || DEFAULT_FILENAME}`);
    response.end(result);
  }

  @Post(ApiRoutes.POST.IMAGE_STREAM)
  @UsePipes(new BodyValidationPipe(IMAGE_BODY_VALIDATION_SCHEMA))
  @Header(HttpHeaders.CONTENT_TYPE, MimeType.APPLICATION.OCTET_STREAM)
  @Header(HttpHeaders.CONTENT_DISPOSITION, 'attachment;filename=image.png')
  @ApiOperation({ description: 'Gets an echarts image as Buffer.' })
  @ApiProduces(MimeType.APPLICATION.OCTET_STREAM)
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiCreatedResponse({ type: Buffer, description: 'The image is successfully returned.' })
  async getImageStream(@Body() opt: Options): Promise<Buffer> {
    this.logger.debug(`Incoming options: ${JSON.stringify(opt)}`);
    return this.echartsService.getImage(opt);
  }
}
