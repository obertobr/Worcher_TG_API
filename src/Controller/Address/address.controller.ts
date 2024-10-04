import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import Address from 'src/Model/Address/address.entity';;
import AddressCrudServiceInterface from 'src/Service/Interface/Address/address.crud.service.interface';



@Controller("/address")
export class AdressController {
  
  constructor(@Inject(AddressCrudServiceInterface) private readonly service: AddressCrudServiceInterface) {}
  @Get('/count')
  async count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<Address[]> {
    
   
    return this.service.list();

  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<Address> {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() address: Address): Promise<Address> {
    return this.service.save(address);
  }

  @Post('/all')
  async createAll(@Body() address: Address[]): Promise<Address[]> {
    return this.service.saveAll(address);
  }

  @Put()
  async update(@Body() address: Address): Promise<Address> {
    return this.service.update(address);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
  
}