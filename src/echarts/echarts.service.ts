import { Injectable } from '@nestjs/common';

import * as node_echarts from 'node-echarts';
import { buffer } from 'imagemin';
import * as imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

import { Options } from './options.interface';

@Injectable()
export class EchartsService {
  async getImage(opt: Options): Promise<Buffer> {
    return buffer(
      node_echarts({
        option: opt.echartOptions,
        width: opt.options?.width || 600,
        height: opt.options?.height || 250,
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
