import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { promises } from 'fs';
import User from 'src/Model/User/user.entity';
import UserCrudServiceInterface from 'src/Service/Interface/User/user.crud.service.interface';

@Controller("/user")
export class UserController {
  
  constructor(@Inject(UserCrudServiceInterface) private readonly service: UserCrudServiceInterface) {}


  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<User[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<User> {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.service.save(user);
  }

  @Post('/all')
  async createAll(@Body() user: User[]): Promise<User[]> {
    return this.service.saveAll(user);
  }

  @Put()
  async update(@Body() user: User): Promise<User> {
    return this.service.update(user);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Post('/recovery_password')
  async recoveryPassword(@Body() object : {id:number}):Promise<void>{
      
      return this.service.recoveryPassword(object.id);
  }

  
}