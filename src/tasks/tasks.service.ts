import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';


@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task) private tasksRepo: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepo.create(createTaskDto);
    return this.tasksRepo.save(newTask);
  }


  findAll() {
    return this.tasksRepo.find();
  }

  findOne(id: string) {
    return this.tasksRepo.findOne(id);
  }

  async update(id: string, body: any) {
    const task = await this.tasksRepo.findOne(id);
    this.tasksRepo.merge(task, body);
    return this.tasksRepo.save(task);
  }

  async remove(id: string) {
    await this.tasksRepo.delete(id);
    return true;
  }
}
