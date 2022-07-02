import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { ResponseHelper } from '../../helpers/response.helper';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [ResponseHelper],
})
export class TasksModule {}
