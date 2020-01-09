import { Module } from '@nestjs/common';

import { EchartsService } from './echarts/echarts.service';

import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [EchartsService],
})
export class AppModule {}
