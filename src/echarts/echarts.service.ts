import { Injectable } from '@nestjs/common';

import * as node_echarts from 'node-echarts';

import { buffer } from 'imagemin';
import * as imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

import { DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT } from './constants';

import { Options } from './options.interface';

@Injectable()
export class EchartsService {
  async getImage(opt: Options): Promise<Buffer> {
    return buffer(
      node_echarts({
        option: opt.echartOptions,
        width: opt.options?.width || DEFAULT_IMAGE_WIDTH,
        height: opt.options?.height || DEFAULT_IMAGE_HEIGHT,
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
