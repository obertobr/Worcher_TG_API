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
  
}