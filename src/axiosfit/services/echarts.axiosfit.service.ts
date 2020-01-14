import { HTTP, POST, Body, Observable, AxiosResponse } from '@yggdrasilts/axiosfit';

import { Options } from '../../echarts/entities/options.entity';

@HTTP()
export class EchartsAxiosfitService {
  private static readonly serviceName = 'EchartsAxiosfitService';

  @POST('/image')
  public getImage(@Body() options: Options): Observable<AxiosResponse<void>> {
    return null;
  }

  @POST('/image-base64')
  public getImageAsBase64(@Body() options: Options): Observable<AxiosResponse<string>> {
    return null;
  }
}
