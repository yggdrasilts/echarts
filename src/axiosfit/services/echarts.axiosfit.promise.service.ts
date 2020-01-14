import { HTTP, POST, Body, Observable, AxiosResponse } from '@yggdrasilts/axiosfit';

import { Options } from '../../echarts/entities/options.entity';

@HTTP({ usePromises: true })
export class EchartsAxiosfitServicePromise {
  private static readonly serviceName = 'EchartsAxiosfitServicePromise';

  @POST('/image')
  public getImage(@Body() options: Options): Promise<AxiosResponse<void>> {
    return null;
  }

  @POST('/image-base64')
  public getImageAsBase64(@Body() options: Options): Promise<AxiosResponse<string>> {
    return null;
  }
}
