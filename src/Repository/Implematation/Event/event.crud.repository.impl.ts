import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Event from "src/Model/Event/event.entity";
import EventCrudRepositoryInterface from "src/Repository/Interface/Event/event.crud.repository.interface";

@Injectable()
export default class EventCrudRepositoryImpl extends BaseCrudRepository<Event> implements EventCrudRepositoryInterface {
    
    constructor(@InjectRepository(Event) readonly repository: Repository<Event>){
        super(repository)
    }

}