import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../../backend/database/mongodb/mongodb.repository';

import { TaskDocument, Task } from './schemas/task.schema';

@Injectable()
export class TasksRepository extends EntityRepository<TaskDocument> {
  constructor(@InjectModel(Task.name) taskModel: Model<TaskDocument>) {
    super(taskModel);
  }
}
