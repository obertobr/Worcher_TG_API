import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';;
import { FormDataRequest } from 'nestjs-form-data';
import Institution from 'src/Model/Institution/institution.entity';
import MembershipRequest from 'src/Model/Institution/membershipRequest.entity';
import Member from 'src/Model/User/member.entity';
import User from 'src/Model/User/user.entity';
import DigitalFileCrudServiceInterface from 'src/Service/Interface/DigitalFile/digitalFile.crud.service.interface';
import InstitutionCrudServiceInterface from 'src/Service/Interface/Institution/institution.crud.service.interface';
import MembershipRequestCrudServiceInterface, { requestEntryInterface } from 'src/Service/Interface/Institution/membershipRequest.crud.service.interface';

@Controller("/institution")
export class InstitutionController {


  
  constructor(@Inject(InstitutionCrudServiceInterface) private readonly service: InstitutionCrudServiceInterface, 
              @Inject(DigitalFileCrudServiceInterface) private readonly digitalFileservice: DigitalFileCrudServiceInterface,
              @Inject(MembershipRequestCrudServiceInterface) private readonly membershipRequest: MembershipRequestCrudServiceInterface) {}


  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<Institution[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<Institution> {
    return this.service.getById(id, ["eventCategoryList"]);
  }

  @Post()
  @FormDataRequest()
  async create(@Body() data): Promise<Institution> {
    const content = JSON.parse(data.content) as {institution: Institution, user: User}
    const institution = content.institution
    const user = content.user
    const image = data.image;
    
    if(image){
      const digitalFile = await this.digitalFileservice.save(image);
      institution.image = digitalFile;
    }
    return this.service.createInstitution(institution, user);
  }

  @Post('/all')
  async createAll(@Body() institution: Institution[]): Promise<Institution[]> {
    return this.service.saveAll(institution);
  }

  @Put()
  @FormDataRequest()
  async update(@Body() data): Promise<Institution> {
    const institution = JSON.parse(data.content) as Institution;
    const image = data.image;

    if(image){
      const oldImageId = (await this.service.getById(institution.id)).image.id;
      const digitalFile = await this.digitalFileservice.save(image);
      institution.image = digitalFile;
      const result = await this.service.update(institution);
      await this.digitalFileservice.delete(oldImageId)
      
      return result
    } else {
      return this.service.update(institution);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    const imageId = (await this.service.getById(id)).image.id
    const result = await this.service.delete(id)
    await this.digitalFileservice.delete(imageId)
    return result
  }

  @Get('/getInstitutionByCode/:code')
  async getInstitutionByCode(@Param('code') code: number): Promise<number> {
    return this.service.getInstitutionByCode(code);
  }

  @Post('/requestEntry')
  async requestEntry(@Body() data: requestEntryInterface): Promise<MembershipRequest> {
    return this.service.requestEntry(data);
  }

  @Get('/acceptEntry/:id')
  async acceptEntry(@Param('id') id: number): Promise<Member> {
    return this.service.acceptEntry(id);
  }

  @Get('/getMembers/:id')
  async getMembers(@Param('id') id: number, @Query('search') search?: string): Promise<Member[]> {
    return this.service.getMembers(id, search);
  }

  @Delete('deleteMembershipRequest/:id')
  async deleteMembershipRequest(@Param('id') id: number): Promise<void> {
    return this.membershipRequest.delete(id)
  }
  
  
}