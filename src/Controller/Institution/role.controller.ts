import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import Role from 'src/Model/Institution/role.entity';
import RoleCrudServiceInterface from 'src/Service/Interface/Institution/role.crud.service.interface';

@Controller("/role")
export class RoleController {
  
  constructor(@Inject(RoleCrudServiceInterface) private readonly service: RoleCrudServiceInterface) {}


  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<Role[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<Role> {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() role: Role): Promise<Role> {
    return this.service.save(role);
  }

  @Post('/all')
  async createAll(@Body() role: Role[]): Promise<Role[]> {
    return this.service.saveAll(role);
  }

  @Put()
  async update(@Body() role: Role): Promise<Role> {
    return this.service.update(role);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
  
}