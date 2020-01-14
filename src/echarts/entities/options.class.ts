import { ApiProperty } from '@nestjs/swagger';

import { EChartOption } from 'echarts';

import { ImageOptions } from './image-options.class';

import { API_ECHART_OPTIONS_SAMPLE } from './options.sample';

/**
 * Class to configure echarts options.
 */
export class Options {
  @ApiProperty({
    type: 'EChartOption',
    description: 'Chart configuration.',
    externalDocs: { url: 'https://echarts.apache.org/en/option.html' },
    required: true,
    example: API_ECHART_OPTIONS_SAMPLE,
  })
  echartOptions: EChartOption;

  @ApiProperty({ required: false, type: ImageOptions })
  options?: ImageOptions;
}
