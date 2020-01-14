import { Controller, Logger, Get } from '@nestjs/common';

import * as fse from 'fs-extra';

import { Axiosfit } from '@yggdrasilts/axiosfit';

import { API_ECHART_OPTIONS_SAMPLE } from '../echarts/entities/options.sample';

import { EchartsAxiosfitService } from './services/echarts.axiosfit.service';
import { EchartsAxiosfitServicePromise } from './services/echarts.axiosfit.promise.service';
import { BufferUtils } from '@yggdrasilts/volundr';

@Controller('axiosfit')
export class AxiosfitController {
  private readonly logger = new Logger(AxiosfitController.name);

  @Get('getImagesUsingObservables')
  async axiosfitGetImagesUsingObservables(): Promise<string> {
    const axiosfitService = new Axiosfit<EchartsAxiosfitService>().baseUrl('http://localhost:3000').create(EchartsAxiosfitService);
    axiosfitService.getImageAsBase64({ echartOptions: API_ECHART_OPTIONS_SAMPLE }).subscribe(
      axiosResponse => {
        this.logger.debug('Getting data.');
        fse.outputFileSync('out/imageObservable.png', BufferUtils.toBinary(axiosResponse.data), 'binary');
      },
      axiosError => this.logger.error(axiosError),
    );
    return 'File saved.';
  }

  @Get('getImagesUsingPromises')
  async axiosfitGetImagesUsingPromises(): Promise<string> {
    const axiosfitService = new Axiosfit<EchartsAxiosfitServicePromise>()
      .baseUrl('http://localhost:3000')
      .create(EchartsAxiosfitServicePromise);
    const response = await axiosfitService.getImageAsBase64({ echartOptions: API_ECHART_OPTIONS_SAMPLE });
    fse.outputFileSync('out/imagePromise.png', BufferUtils.toBinary(response.data), 'binary');
    return 'File saved.';
  }
}
