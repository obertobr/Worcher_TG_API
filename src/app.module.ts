import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './Service/Validation/validation.exception.filter';
import { ResponseInterceptor } from './Controller/response/response.interceptor';
import { ConfigController } from './Controller/User/config.controller';
import { ConfigServiceModule } from './Service/Implemetation/User/config.service.module';


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
    ConfigServiceModule,
  ],
  controllers: [AppController,ConfigController],
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
