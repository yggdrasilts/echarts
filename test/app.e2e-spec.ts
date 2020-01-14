import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';

import * as request from 'supertest';

import { API_ECHART_OPTIONS_SAMPLE } from '../src/echarts/entities/options.class';

import { AppModule } from '../src/app.module';
import { ApiRoutes } from '../src/api/api.routes';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('(POST)', () => {
    it(`${ApiRoutes.POST.IMAGE} ${HttpStatus.BAD_REQUEST}`, () => {
      return request(app.getHttpServer())
        .post(ApiRoutes.POST.IMAGE)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it(`${ApiRoutes.POST.IMAGE} ${HttpStatus.CREATED}`, () => {
      const body = {
        echartOptions: API_ECHART_OPTIONS_SAMPLE,
      };
      return request(app.getHttpServer())
        .post(ApiRoutes.POST.IMAGE)
        .send(body)
        .expect(HttpStatus.CREATED);
    });

    it(`${ApiRoutes.POST.IMAGE_BASE_64} ${HttpStatus.BAD_REQUEST}`, () => {
      return request(app.getHttpServer())
        .post(ApiRoutes.POST.IMAGE_BASE_64)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it(`${ApiRoutes.POST.IMAGE_BASE_64} ${HttpStatus.CREATED}`, () => {
      const body = {
        echartOptions: API_ECHART_OPTIONS_SAMPLE,
      };
      return request(app.getHttpServer())
        .post(ApiRoutes.POST.IMAGE)
        .send(body)
        .expect(HttpStatus.CREATED);
    });
  });
});
