import { Controller, Post, Body, Header, Res, UsePipes, Logger } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags, ApiOperation, ApiProduces } from '@nestjs/swagger';
import { Response } from 'express';

import { HttpHeaders, MimeType, BufferUtils } from '@yggdrasilts/volundr';

import { ApiRoutes } from './api/api.routes';

import { BodyValidationPipe } from './pipes/body.validation.pipe';

import { EchartsService } from './echarts/echarts.service';
import { Options } from './echarts/entities/options.entity';
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
  @ApiCreatedResponse({ description: 'The image is successfully returned.' })
  async getImage(@Body() opt: Options, @Res() response: Response): Promise<void> {
    this.logger.debug(`Incoming options: ${JSON.stringify(opt)}`);
    const result = await this.echartsService.getImage(opt);
    response.setHeader(HttpHeaders.CONTENT_LENGTH, result.length);
    response.setHeader(HttpHeaders.CONTENT_DISPOSITION, `attachment;filename=${opt.options?.filename || DEFAULT_FILENAME}`);
    response.end(result);
  }

  @Post(ApiRoutes.POST.IMAGE_BASE_64)
  @UsePipes(new BodyValidationPipe(IMAGE_BODY_VALIDATION_SCHEMA))
  @Header(HttpHeaders.CONTENT_DISPOSITION, MimeType.TEXT.PLAIN)
  @ApiOperation({ description: 'Gets an echarts image as base64 string.' })
  @ApiProduces(MimeType.TEXT.PLAIN)
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiCreatedResponse({ type: Buffer, description: 'The image is successfully returned.' })
  async getImageInBase64(@Body() opt: Options): Promise<string> {
    this.logger.debug(`Incoming options: ${JSON.stringify(opt)}`);
    return BufferUtils.toBase64(await this.echartsService.getImage(opt));
  }
}
