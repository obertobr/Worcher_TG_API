import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import Config from 'src/Model/User/config.entity';
import ConfigCrudServiceInterface from 'src/Service/Interface/User/config.crud.service.interface';

@Controller("/config")
export class ConfigController {
  
  constructor(@Inject(ConfigCrudServiceInterface) private readonly service: ConfigCrudServiceInterface) {}


  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Config> {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() config: Config): Promise<Config> {
    return this.service.save(config);
  }


  @Put()
  async update(@Body() config: Config): Promise<Config> {
    return this.service.update(config);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Get('/list')
  async list(): Promise<Config[]> {
    return this.service.list();
  }
  
}