import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  const mockAccessToken = 'asd.asd.asd';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/books')
      .set('Authorization', `Bearer ${mockAccessToken}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
});
