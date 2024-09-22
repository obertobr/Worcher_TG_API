import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import Event from 'src/Model/Event/event.entity';
import EventCrudServiceInterface from 'src/Service/Interface/Event/event.crud.service.interface';

@Controller("/event")
export class EventController {
  
  constructor(@Inject(EventCrudServiceInterface) private readonly service: EventCrudServiceInterface) {}

  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<Event[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<Event> {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() event: Event): Promise<Event> {
    return this.service.save(event);
  }

  @Post('/all')
  async createAll(@Body() event: Event[]): Promise<Event[]> {
    return this.service.saveAll(event);
  }

  @Put()
  async update(@Body() event: Event): Promise<Event> {
    return this.service.update(event);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
  
}