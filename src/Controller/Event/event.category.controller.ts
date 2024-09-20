
import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import EventCategory from 'src/Model/Event/event.category.entity';

import EventCategoryCrudServiceInterface from 'src/Service/Interface/Event/event.category.crud.service.interface';

@Controller("/event-category")
export class EventCategoryController {
  
  constructor(@Inject(EventCategoryCrudServiceInterface) private readonly service: EventCategoryCrudServiceInterface) {}

  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<EventCategory[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<EventCategory> {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() eventCategory: EventCategory): Promise<EventCategory> {
    return this.service.save(eventCategory);
  }

  @Post('/all')
  async createAll(@Body() eventCategory: EventCategory[]): Promise<EventCategory[]> {
    return this.service.saveAll(eventCategory);
  }

  @Put()
  async update(@Body() eventCategory: EventCategory): Promise<EventCategory> {
    return this.service.update(eventCategory);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
  
}