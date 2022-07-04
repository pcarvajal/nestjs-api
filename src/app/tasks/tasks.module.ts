import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { TasksService } from './tasks.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'task', schema: TaskSchema }])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
