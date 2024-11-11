import { DynamicModule, Module, OnModuleInit, Provider } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ValidationExceptionFilter } from './Service/Validation/validation.exception.filter';
import { ConfigController } from './Controller/User/config.controller';
import { UserServiceModule } from './Service/Implemetation/User/user.service.module';
import { UserController } from './Controller/User/user.controller';
import { MemberController } from './Controller/User/member.controller';
import { EventCategoryController } from './Controller/Event/event.category.controller';
import { EventServiceModule } from './Service/Implemetation/Event/event.service.module';
import { RoleController } from './Controller/Institution/role.controller';
import { InstitutionServiceModule } from './Service/Implemetation/Institution/institution.service.module';
import { EventController } from './Controller/Event/event.controller';
import { PermissionController } from './Controller/Institution/permission.controller';
import { StateController } from './Controller/Address/state.controller';
import { AddressServiceModule } from './Service/Implemetation/Address/address.service.module';
import { CityController } from './Controller/Address/city.controller';
import { AdressController } from './Controller/Address/address.controller';
import { ConfigModule } from '@nestjs/config';
import { RecoveryRepositoryModule } from './Repository/Implematation/Recovery/recovery.repository.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CsvService } from './Service/Implemetation/CsvAdress/Csvaddress.crud.service.impl';
import { AddressRepositoryModule } from './Repository/Implematation/Address/address.repository.module';
import Address from './Model/Address/address.entity';
import City from './Model/Address/city.entity';
import State from './Model/Address/state.entity';
import * as path from 'path';
import { InstitutionController } from './Controller/Institution/institution.controller';
import { DigitalFileRepositoryModule } from './Repository/Implematation/DigitalFile/digitalFile.repository.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { DigitalFileServiceModule } from './Service/Implemetation/DigitalFile/digitalFile.service.module';
import { AccountController } from './Controller/User/account.controller';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root',
      password: '',
      database: 'worcher',
      entities: ['dist/**/*.entity.js'],
      synchronize: true // NÃO USE EM PRODUÇÃO - sincroniza as entidades automaticamente
    }),
    TypeOrmModule.forFeature([Address, City, State]),
    NestjsFormDataModule,
    UserServiceModule,
    EventServiceModule,
    InstitutionServiceModule,
    AddressServiceModule,
    RecoveryRepositoryModule,
    DigitalFileServiceModule,
  ],
  controllers: [AppController,
                ConfigController, 
                UserController, 
                MemberController, 
                EventCategoryController, 
                EventController,
                RoleController,
                PermissionController,
                StateController,
                CityController,
                AdressController,
                InstitutionController,
                AccountController
              ],
  providers: [
    AppService,
    CsvService,
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})



export class AppModule implements OnModuleInit {
  constructor(private readonly csvService: CsvService) {}
  
  async onModuleInit() {
    const statefilePath = path.join(__dirname, '..', 'csv_arquives', 'estados.csv');
    const citiesfilePath = path.join(__dirname, '..', 'csv_arquives', 'municipios.csv');
    try {
      await this.csvService.processCsv(statefilePath,citiesfilePath);
    } catch (error) {
      console.error('Erro Trying to  process CSV:', error.message);
    }
  }
}
