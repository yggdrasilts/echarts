import { Controller, Logger, Get } from '@nestjs/common';

import * as fs from 'fs';

import { Axiosfit } from '@yggdrasilts/axiosfit';

import { API_ECHART_OPTIONS_SAMPLE } from '../echarts/entities/options.class';

import { EchartsAxiosfitService } from './services/echarts.axiosfit.service';
import { EchartsAxiosfitServicePromise } from './services/echarts.axiosfit.promise.service';
import { BufferUtils } from '@yggdrasilts/volundr';

@Controller()
export class AxiosfitController {
  private readonly logger = new Logger(AxiosfitController.name);

  @Get('axiosfitGetImagesUsingObservables')
  async axiosfitGetImagesUsingObservables(): Promise<string> {
    const axiosfitService = new Axiosfit<EchartsAxiosfitService>().baseUrl('http://localhost:3000').create(EchartsAxiosfitService);
    axiosfitService.getImageAsBase64({ echartOptions: API_ECHART_OPTIONS_SAMPLE }).subscribe(
      axiosResponse => {
        this.logger.debug('Getting data.');
        fs.writeFileSync('imageObservable.png', BufferUtils.toBinary(axiosResponse.data), 'binary');
      },
      axiosError => this.logger.error(axiosError),
    );
    return 'File saved.';
  }

  @Get('axiosfitGetImagesUsingPromises')
  async axiosfitGetImagesUsingPromises(): Promise<string> {
    const axiosfitService = new Axiosfit<EchartsAxiosfitServicePromise>()
      .baseUrl('http://localhost:3000')
      .create(EchartsAxiosfitServicePromise);
    const response = await axiosfitService.getImageAsBase64({ echartOptions: API_ECHART_OPTIONS_SAMPLE });
    fs.writeFileSync('imagePromise.png', BufferUtils.toBinary(response.data), 'binary');
    return 'File saved.';
  }
}
