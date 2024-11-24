import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import Event from 'src/Model/Event/event.entity';
import DigitalFileCrudServiceInterface from 'src/Service/Interface/DigitalFile/digitalFile.crud.service.interface';
import EventCrudServiceInterface from 'src/Service/Interface/Event/event.crud.service.interface';

@Controller("/event")
export class EventController {
  
  constructor(@Inject(EventCrudServiceInterface) private readonly service: EventCrudServiceInterface,
              @Inject(DigitalFileCrudServiceInterface) private readonly digitalFileservice: DigitalFileCrudServiceInterface) {}

  @Get('/count')
  count(): Promise<number> {
    return this.service.count();
  }

  @Get('/list')
  async list(): Promise<Event[]> {
    return this.service.list();
  }

  @Get('/id/:id')
  async getById(@Param('id') id: number): Promise<Event> {
    return this.service.getById(id, ["member","registeredMemberList","institution","eventCategory","address","address.city.state"]);
  }

  @Get('/getEventByInstitutionAndCategory/:idInstitution/:idEventCategory')
  async getEventsByInstitutionAndCategory(@Param('idInstitution') idInstitution: number, @Param('idEventCategory') idEventCategory: number | null): Promise<Event[]> {
    return this.service.getEventsByInstitutionAndCategory(idInstitution,idEventCategory);
  }

  @Get('/addMemberToEvent/:eventId/:memberId')
  async addMemberToEvent(@Param('eventId') eventId: number, @Param('memberId') memberId: number): Promise<void> {
    return this.service.addMemberToEvent(eventId,memberId);
  }

  @Get('/removeMemberFromEvent/:eventId/:memberId')
  async removeMemberFromEvent(@Param('eventId') eventId: number, @Param('memberId') memberId: number): Promise<void> {
    return this.service.removeMemberFromEvent(eventId,memberId);
  }

  @Get('/removeMemberFromEventByUserId/:eventId/:userId')
  async removeMemberFromEventByUserId(@Param('eventId') eventId: number, @Param('userId') userId: number): Promise<void> {
    return this.service.removeMemberFromEventByUser(eventId,userId);
  }

  @Post()
  @FormDataRequest()
  async create(@Body() data): Promise<Event> {
    const event = JSON.parse(data.content) as Event;
    const image = data.image;

    if(image){
      const digitalFile = await this.digitalFileservice.save(image);
      event.image = digitalFile;
    }

    return this.service.save(event);
  }

  @Post('/all')
  async createAll(@Body() event: Event[]): Promise<Event[]> {
    return this.service.saveAll(event);
  }

  @Put()
  @FormDataRequest()
  async update(@Body() data): Promise<Event> {
    const event = JSON.parse(data.content) as Event;
    const image = data.image;

    if(image){
      const oldImageId = (await this.service.getById(event.id)).image.id;
      const digitalFile = await this.digitalFileservice.save(image);
      event.image = digitalFile;
      const result = await this.service.update(event);
      await this.digitalFileservice.delete(oldImageId)
      
      return result
    } else {
      return this.service.update(event);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    const imageId = (await this.service.getById(id)).image.id
    const result = await this.service.delete(id)
    await this.digitalFileservice.delete(imageId)
    return result
  }

  @Get('/eventsByIdUser/:userId')
  getEventsByUser(@Param('userId') userId: number): Promise<Event[]>{
    return this.service.getEventsByUser(userId);
  }
  
}