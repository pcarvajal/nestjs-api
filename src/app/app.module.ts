import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongodbConfiguration } from '../backend/database/mongodb/mongodb.configuration';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRootAsync({ useClass: MongodbConfiguration }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<number>('PORT');
  }
}
