import { HTTP, POST, Body, Observable, AxiosResponse } from '@yggdrasilts/axiosfit';

import { Options } from '../../echarts/entities/options.class';

@HTTP({ usePromises: true })
export class EchartsAxiosfitServicePromise {
  private static readonly serviceName = 'EchartsAxiosfitServicePromise';

  @POST('/image')
  public getImage(@Body() options: Options): Promise<AxiosResponse<void>> {
    return null;
  }

  @POST('/image-stream')
  public getImageStream(@Body() options: Options): Promise<AxiosResponse<Buffer>> {
    return null;
  }
}
