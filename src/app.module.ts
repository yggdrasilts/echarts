import { Module } from '@nestjs/common';

import { EchartsModule } from './echarts/echarts.module';
import { AxiosfitModule } from './axiosfit/axiosfit.module';

import { AppController } from './app.controller';

@Module({
  imports: [EchartsModule, AxiosfitModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
