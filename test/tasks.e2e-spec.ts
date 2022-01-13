import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TasksModule } from './../src/tasks/tasks.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './../src/tasks/entities/task.entity';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  const mockTask = {name: 'tarea mocking'};

  const mockTasksRepository = {
      find : jest.fn().mockResolvedValue(mockTask),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn()
            .mockImplementation((user) =>
            Promise.resolve({id:'1', ...user}),
            ),

  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.
    createTestingModule({
      imports: [TasksModule],
    })
    .overrideProvider(getRepositoryToken(Task))
    .useValue(mockTasksRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get a tasks', () => {
    return request(app.getHttpServer())
      .get('/api/tasks')
      .expect(200)
      .expect(mockTask);
  });

it('should create a new task', () => {
    return request(app.getHttpServer())
    .post('/api/tasks')
    .send({name:"tarea testing e2e"})
    .expect(201)
    .then(response => {
        expect(response.body).toEqual({
            id: expect.any(String),
            name: "tarea testing e2e"
        })
    });
    
});
});
