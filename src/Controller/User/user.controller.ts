import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { promises } from 'fs';
import { FormDataRequest } from 'nestjs-form-data';
import DigitalFile from 'src/Model/DigitalFile/digitalFile.entity';
import Account from 'src/Model/User/account.entity';
import User from 'src/Model/User/user.entity';
import DigitalFileCrudServiceInterface from 'src/Service/Interface/DigitalFile/digitalFile.crud.service.interface';
import UserCrudServiceInterface from 'src/Service/Interface/User/user.crud.service.interface';
import * as bcrypt from 'bcrypt';

@Controller("/user")
export class UserController {
  
  constructor(@Inject(UserCrudServiceInterface) private readonly service: UserCrudServiceInterface,
              @Inject(DigitalFileCrudServiceInterface) private readonly digitalFileservice: DigitalFileCrudServiceInterface,) {}


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
  async recoveryPassword(@Body() object : {email:string}):Promise<{accountId:Number}>{
      return this.service.recoveryPassword(object.email);
  }

  @Post('/recovery_check')
  async recoveryCheck(@Body() object : {id:number,code:number}):Promise<void>{
    return this.service.recoveryCheck(object.id,object.code);
  }

  @Post('/login')
  async login(@Body() account: Account): Promise<User> {
    return this.service.login(account.email, account.password);
  }

  @Post('/setPhoto')
  @FormDataRequest()
  async setPhoto(@Body() datajson): Promise<User> {
    console.log(datajson)
    const data = JSON.parse(datajson.content) as {userID: number};
    const image = datajson.image;

    const user = await this.service.getById(data.userID)

    if(image){
      if(user.image){
        await this.digitalFileservice.delete(user.image.id)
      }

      const digitalFile = await this.digitalFileservice.save(image);
      user.image = digitalFile;

      console.log(user)

      const userUpdated = new User()
      const userAssigned = Object.assign(userUpdated, {
        id: user.id, 
        name: user.name,
        cpf: user.cpf, 
        dateOfBirth: user.dateOfBirth,
        image: user.image
      })

      return await this.service.update(userAssigned)
    }
  }
}