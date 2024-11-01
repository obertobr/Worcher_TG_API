import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import Permission from 'src/Model/Institution/permission.entity';
import PermissionCrudServiceInterface from 'src/Service/Interface/Institution/permission.crud.service.interface';

@Controller("/permission")
export class PermissionController {
  
  constructor(@Inject(PermissionCrudServiceInterface) private readonly service: PermissionCrudServiceInterface) {}


  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<Permission[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<Permission> {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() permission: Permission): Promise<Permission> {
    return this.service.save(permission);
  }

  @Post('/all')
  async createAll(@Body() permission: Permission[]): Promise<Permission[]> {
    return this.service.saveAll(permission);
  }

  @Put()
  async update(@Body() permission: Permission): Promise<Permission> {
    return this.service.update(permission);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
  
}