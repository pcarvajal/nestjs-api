import { Controller, Get, Param } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ResponseHelper } from '../../helpers/response.helper';
import { Task } from './interfaces/task';
import { GenericResponse } from '../../commons/responses/generic-response';

@Controller('tasks')
export class TasksController {
  constructor(private responseHelper: ResponseHelper<Task>) {}

  @Get()
  get(@Param('id') id: string): GenericResponse<Task> {
    const newTask: Task = {
      createdAt: new Date().toDateString(),
      description: 'Desc',
      name: 'Tarea 1',
      id: id,
      expirationDate: new Date().toDateString(),
    };

    return this.responseHelper.successResponse(newTask, 0, 'lala');
  }
}
