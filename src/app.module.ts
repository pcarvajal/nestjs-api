import { Module } from '@nestjs/common';
import { TasksModule } from './app/tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [],
  providers: [],
})
export class AppModule {}
