import { Injectable } from '@nestjs/common';

import { EChartOption } from 'echarts';

import * as node_echarts from 'node-echarts';
import { buffer } from 'imagemin';
import * as imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

@Injectable()
export class AppService {
  async getImage(options: EChartOption): Promise<Buffer> {
    return buffer(
      node_echarts({
        option: options,
        width: 600,
        height: 250,
      }),
      {
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      },
    );
  }
}
