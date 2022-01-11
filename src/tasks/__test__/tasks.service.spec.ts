import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { TasksService } from './../tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn()
          .mockImplementation((user) =>
          Promise.resolve({id:'1', ...user}),
          ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, {
        provide: getRepositoryToken(Task),
        useValue: mockUserRepository
      }],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    expect(await service.create({name:"Tarea testing"})).toEqual({
      id: expect.any(String) ,
      name:"Tarea testing"
    });
  });

});
