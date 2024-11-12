import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import Account from 'src/Model/User/account.entity';
import AccountCrudServiceInterface from 'src/Service/Interface/User/account.crud.service.interface';

@Controller("/account")
export class AccountController {
  
  constructor(@Inject(AccountCrudServiceInterface) private readonly service: AccountCrudServiceInterface) {}


  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<Account[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<Account> {
    return this.service.getById(id,["user"]);
  }

  @Post()
  async create(@Body() user: Account): Promise<Account> {
    return this.service.save(user);
  }

  @Post('/all')
  async createAll(@Body() user: Account[]): Promise<Account[]> {
    return this.service.saveAll(user);
  }

  @Put()
  async update(@Body() user: Account): Promise<Account> {
    return this.service.update(user);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
}