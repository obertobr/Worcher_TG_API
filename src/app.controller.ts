import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import ValidationExcpection from './Service/Validation/validation.exception';


@Controller()
export class AppController {

  
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/error")
  getError(){
    throw new ValidationExcpection(["Erro 1"]);
  }

  @Get("/acerto")
  getAcerto(){
    return {msg: "teste legal"}
  }

  @Get('/object')
  getObject(){
    //this.configCrudRepository.getTeste();
  }
}