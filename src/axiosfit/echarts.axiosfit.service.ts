import { HTTP, POST, Body, Observable, AxiosResponse } from '@yggdrasilts/axiosfit';

import { Options } from '../echarts/entities/options.class';

@HTTP()
export class EchartsAxiosfitService {
  private static readonly serviceName = 'EchartsAxiosfitService';

  @POST('/image')
  public getImage(@Body() options: Options): Observable<AxiosResponse<void>> {
    return null;
  }

  @POST('/image-stream')
  public getImageStream(@Body() options: Options): Observable<AxiosResponse<Buffer>> {
    return null;
  }
}
