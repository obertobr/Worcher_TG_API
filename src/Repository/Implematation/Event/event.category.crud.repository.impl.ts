
import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import EventCategoryCrudRepositoryInterface from 'src/Repository/Interface/Event/event.category.crud.repository.interface';
import EventCategory from "src/Model/Event/event.category.entity";

@Injectable()
export default class EventCategoryCrudRepositoryImpl extends BaseCrudRepository<EventCategory> implements EventCategoryCrudRepositoryInterface {
    
    constructor(@InjectRepository(EventCategory) readonly repository: Repository<EventCategory>){
        super(repository)
    }

}