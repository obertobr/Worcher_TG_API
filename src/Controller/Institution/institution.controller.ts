import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';;
import { FormDataRequest } from 'nestjs-form-data';
import Institution from 'src/Model/Institution/institution.entity';
import DigitalFileCrudServiceInterface from 'src/Service/Interface/DigitalFile/digitalFile.crud.service.interface';
import InstitutionCrudServiceInterface from 'src/Service/Interface/Institution/institution.crud.service.interface';

@Controller("/institution")
export class InstitutionController {
  
  constructor(@Inject(InstitutionCrudServiceInterface) private readonly service: InstitutionCrudServiceInterface, 
              @Inject(DigitalFileCrudServiceInterface) private readonly digitalFileservice: DigitalFileCrudServiceInterface) {}


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
    return this.service.getById(id);
  }

  @Post()
  @FormDataRequest()
  async create(@Body() data): Promise<Institution> {
    const institution = JSON.parse(data.content);
    const image = data.image;
    this.digitalFileservice.save(image);
    return this.service.save(institution);
  }

  @Post('/all')
  async createAll(@Body() institution: Institution[]): Promise<Institution[]> {
    return this.service.saveAll(institution);
  }

  @Put()
  async update(@Body() institution: Institution): Promise<Institution> {
    return this.service.update(institution);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
  
}