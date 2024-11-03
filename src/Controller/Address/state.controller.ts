import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import State from 'src/Model/Address/state.entity';
import StateCrudServiceInterface from 'src/Service/Interface/Address/state.crud.service.interface';

@Controller("/state")
export class StateController {
  
  constructor(@Inject(StateCrudServiceInterface) private readonly service: StateCrudServiceInterface) {}

  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<State[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<State> {
    return this.service.getById(id,['citiesList']);
  }

  @Post()
  async create(@Body() state: State): Promise<State> {
    return this.service.save(state);
  }

  @Post('/all')
  async createAll(@Body() state: State[]): Promise<State[]> {
    return this.service.saveAll(state);
  }

  @Put()
  async update(@Body() state: State): Promise<State> {
    return this.service.update(state);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
  
}