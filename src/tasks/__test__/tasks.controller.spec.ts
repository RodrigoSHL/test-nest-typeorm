import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './../tasks.service';
import { TasksController } from './../tasks.controller';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    create: jest.fn(dto => {
      return {
        id: 1,
        ...dto
      }
    }),
    update: jest.fn().mockImplementation((id,dto)=> ({
      id,
      ...dto
    })),
    findAll: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService]
    })
    .overrideProvider(TasksService)
    .useValue(mockTasksService)
    .compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = {name : 'Tarea testing'};
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name
    });
    expect(mockTasksService.create).toHaveBeenCalledWith(dto);

  });

  it('should updated a user', () => {
    const dto = {name : 'Tarea testing'};
    expect(controller.update('1',dto)).toEqual({
      id: '1',
      ...dto
    });
    expect(mockTasksService.update).toHaveBeenCalled();
  });

  it('should return a user list', () => {
    expect(controller.findAll());
    expect(mockTasksService.findAll).toHaveBeenCalled();
  });
 
 
});
