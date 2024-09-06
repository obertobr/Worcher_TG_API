import { Controller, Get, Inject } from '@nestjs/common';
import ConfigCrudServiceInterface from 'src/Service/Interface/User/config.crud.service.interface';

@Controller("/config")
export class ConfigController {

  
  constructor(@Inject('ConfigCrudServiceInterface') private readonly service: ConfigCrudServiceInterface) {}

  @Get('/count')
  count(): Promise<number> {
    console.log(this.service)
    return this.service.count();
  }

  
}