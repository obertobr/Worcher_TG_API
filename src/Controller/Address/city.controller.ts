import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import City from 'src/Model/Address/city.entity';
import CityCrudServiceInterface from 'src/Service/Interface/Address/city.crud.service.interface';


@Controller("/city")
export class CityController {
  
  constructor(@Inject(CityCrudServiceInterface) private readonly service: CityCrudServiceInterface) {}

  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<City[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<City> {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() city: City): Promise<City> {
    return this.service.save(city);
  }

  @Post('/all')
  async createAll(@Body() city: City[]): Promise<City[]> {
    return this.service.saveAll(city);
  }

  @Put()
  async update(@Body() city: City): Promise<City> {
    return this.service.update(city);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
  
}