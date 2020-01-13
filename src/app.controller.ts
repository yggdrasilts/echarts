import { Controller, Post, Body, Header, Res, UsePipes, Logger, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';

import * as fs from 'fs';

import { HttpHeaders, MimeType } from '@yggdrasilts/volundr';

import { Axiosfit } from '@yggdrasilts/axiosfit';

import { ApiRoutes } from './api/api.routes';

import { BodyValidationPipe } from './pipes/body.validation.pipe';

import { EchartsService } from './echarts/echarts.service';
import { Options, API_ECHART_OPTIONS_SAMPLE } from './echarts/entities/options.class';
import { IMAGE_BODY_VALIDATION_SCHEMA, DEFAULT_FILENAME } from './echarts/constants';

import { EchartsAxiosfitService } from './axiosfit/echarts.axiosfit.service';
import { EchartsAxiosfitServicePromise } from './axiosfit/echarts.axiosfit.promise.service';

@ApiTags('echarts')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly echartsService: EchartsService) {}

  @Post(ApiRoutes.POST.IMAGE)
  @Header(HttpHeaders.CONTENT_TYPE, MimeType.IMAGE.PNG)
  @UsePipes(new BodyValidationPipe(IMAGE_BODY_VALIDATION_SCHEMA))
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
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiCreatedResponse({ type: Buffer, description: 'The image is successfully returned.' })
  async getImageStream(@Body() opt: Options): Promise<Buffer> {
    this.logger.debug(`Incoming options: ${JSON.stringify(opt)}`);
    return this.echartsService.getImage(opt);
  }

  @Get('axiosfitGetImagesUsingObservables')
  @ApiExcludeEndpoint()
  async axiosfitGetImagesUsingObservables(): Promise<string> {
    const axiosfitService = new Axiosfit<EchartsAxiosfitService>().baseUrl('http://localhost:3000').create(EchartsAxiosfitService);
    axiosfitService.getImageStream({ echartOptions: API_ECHART_OPTIONS_SAMPLE }).subscribe(
      axiosResponse => {
        this.logger.debug('Getting data.');
        fs.writeFileSync('imageObservable.png', Buffer.from(axiosResponse.data));
      },
      axiosError => this.logger.error(axiosError),
    );
    return 'File saved.';
  }

  @Get('axiosfitGetImagesUsingPromises')
  @ApiExcludeEndpoint()
  async axiosfitGetImagesUsingPromises(): Promise<string> {
    const axiosfitService = new Axiosfit<EchartsAxiosfitServicePromise>()
      .baseUrl('http://localhost:3000')
      .create(EchartsAxiosfitServicePromise);
    const response = await axiosfitService.getImageStream({ echartOptions: API_ECHART_OPTIONS_SAMPLE });
    fs.writeFileSync('imagePromise.png', Buffer.from(response.data));
    return 'File saved.';
  }
}
