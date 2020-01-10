import { ApiProperty } from '@nestjs/swagger';

import { EChartOption } from 'echarts';

export class Options {
  @ApiProperty({ name: 'echartOptions', type: 'EChartOption', required: true })
  echartOptions: EChartOption;
  @ApiProperty({ required: false, type: 'ApiOptions' })
  options?: ApiOptions;
}

interface ApiOptions {
  // Image width
  width?: number;

  // Image height
  height?: number;

  // Download file name
  filename?: string;
}
