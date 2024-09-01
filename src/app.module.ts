import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './Service/Validation/validation.exception.filter';
import { InjectableImplRegistry } from './Injectable/injectable.impl.registry';
import { InjectableImplRegistrar } from './Injectable/injectable.impl.register';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root',
      password: 'mysql',
      database: 'worcher',
      entities: ['dist/**/*.entity.js'],
      synchronize: true, // NÃO USE EM PRODUÇÃO - sincroniza as entidades automaticamente
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    InjectableImplRegistrar,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    ...Array.from(InjectableImplRegistry.getImplementations().entries())
      .map(([interfaceType, implementation]) => ({
        provide: interfaceType,
        useClass: implementation,
      })),
  ],
})
export class AppModule {
  constructor(private readonly injectableImplRegistrar: InjectableImplRegistrar) {
    this.injectableImplRegistrar.registerImplementations();
  }
}
