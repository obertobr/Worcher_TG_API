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

    async getEventsByInstitutionAndCategory(
        institutionId: number,
        idCategory?: number | null
      ): Promise<Event[]> {

        const query = this.repository
          .createQueryBuilder("event")
          .leftJoinAndSelect("event.member", "member")
          .leftJoinAndSelect("event.registeredMemberList", "registeredMemberList")
          .leftJoinAndSelect("event.institution", "institution")
          .leftJoinAndSelect("event.eventCategory", "eventCategory")
          .leftJoinAndSelect("event.address", "address")
          .leftJoinAndSelect("event.image", "image")
          .where("event.institution.id = :institutionId", { institutionId });
      
        if (idCategory) {
          query.andWhere("event.eventCategory.id = :idCategory", { idCategory });
        }
      
        return query.getMany();
      }

}