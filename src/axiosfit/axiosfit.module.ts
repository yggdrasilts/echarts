import { Module } from '@nestjs/common';

import { AxiosfitController } from './axiosfit.controller';

@Module({
  controllers: [AxiosfitController],
})
export class AxiosfitModule {}
