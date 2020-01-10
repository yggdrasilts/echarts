import { EChartOption } from 'echarts';

export interface Options {
  echartOptions: EChartOption;
  options?: apiOptions;
}

interface apiOptions {
  // Image width
  width?: number;

  // Image height
  height?: number;

  // Download file name
  filename?: string;
}
