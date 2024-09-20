import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import Member from 'src/Model/User/member.entity';
import User from 'src/Model/User/user.entity';
import MemberCrudServiceInterface from 'src/Service/Interface/User/member.crud.service.interface';
import { Entity } from 'typeorm';

@Controller("/member")
export class MemberController {
  
  constructor(@Inject(MemberCrudServiceInterface) private readonly service: MemberCrudServiceInterface) {}


  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<Member[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<Member> {
    return this.service.getById(id);
  }

  @Get('/id/:id/user')
  async getUser(@Param('id') id: number): Promise<User> {
    return (await this.service.getById(id)).user;
  }

  @Post()
  async create(@Body() member: Member): Promise<Member> {
    return this.service.save(member);
  }

  @Post('/all')
  async createAll(@Body() member: Member[]): Promise<Member[]> {
    return this.service.saveAll(member);
  }

  @Put()
  async update(@Body() member: Member): Promise<Member> {
    return this.service.update(member);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
  
}