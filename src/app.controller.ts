import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import ValidationExcpection from './Service/Validation/validation.exception';
import ConfigCrudRepositoryInterface from './Repository/Interface/User/config.crud.repository.interface';

@Controller()
export class AppController {

  
  constructor(private readonly appService: AppService,
    @Inject(Symbol('ConfigCrudRepositoryInterface')) 
    private readonly configCrudRepository: ConfigCrudRepositoryInterface,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/error")
  getError(){
    throw new ValidationExcpection(["Erro 1"]);
  }

  @Get('/object')
  getObject(){
    this.configCrudRepository.getTeste();
  }
}