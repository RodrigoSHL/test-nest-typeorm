import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TasksModule } from './../src/tasks/tasks.module';
import { TasksService } from './../src/tasks/tasks.service';

const url = '/api/tasks';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService
      ],
      imports: [AppModule, TasksModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .expect(200)
      
  });

  afterAll(async () => {
    await app.close();
  });
});
