import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './Service/Validation/validation.exception.filter';
import { ResponseInterceptor } from './Controller/Response/response.interceptor';
import { ConfigController } from './Controller/User/config.controller';
import { UserServiceModule } from './Service/Implemetation/User/user.service.module';
import { UserController } from './Controller/User/user.controller';
import { EventCategoryController } from './Controller/Event/event.category.controller';
import { EventServiceModule } from './Service/Implemetation/Event/event.service.module';
import EventCategory from './Model/Event/event.category.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root',
      password: '',
      database: 'worcher',
      entities: ['dist/**/*.entity.js'],
      synchronize: true, // NÃO USE EM PRODUÇÃO - sincroniza as entidades automaticamente
    }),
    UserServiceModule,
    EventServiceModule,
  ],
  controllers: [AppController, ConfigController, UserController, EventCategoryController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor() {
  }
}
