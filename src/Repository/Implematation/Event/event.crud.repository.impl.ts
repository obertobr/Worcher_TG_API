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
        idCategory?: number | null,
        removeEventsWithDateBeforeDateNow: boolean = true
      ): Promise<Event[]> {

        const query = this.repository
          .createQueryBuilder("event")
          .leftJoinAndSelect("event.member", "member")
          .leftJoinAndSelect("member.user", "creatorUser")
          .leftJoinAndSelect("event.registeredMemberList", "registeredMemberList")
          .leftJoinAndSelect("registeredMemberList.user", "participantUser")
          .leftJoinAndSelect("event.institution", "institution")
          .leftJoinAndSelect("event.eventCategory", "eventCategory")
          .leftJoinAndSelect("event.address", "address")
          .leftJoinAndSelect("event.image", "image")
          .where("event.institution.id = :institutionId", { institutionId })

        if(removeEventsWithDateBeforeDateNow){
          query.andWhere("event.dateTimeOfExecution >= :currentDateTime", { currentDateTime: new Date() });
        }
      
        if (idCategory) {
          query.andWhere("event.eventCategory.id = :idCategory", { idCategory });
        }

        query.addOrderBy("event.dateTimeOfExecution", "ASC");
      
        return query.getMany();
      }

      async getEventWithRegisteredMemberList(eventId: number): Promise<Event>{
        return await this.repository.findOne({
            where: { id: eventId },
            relations: ['registeredMemberList'],
          });
      }

      async getEventsByUser(userId: number): Promise<Event[]> {
        const query = this.repository
          .createQueryBuilder("event")
          .leftJoinAndSelect("event.member", "member")
          .leftJoinAndSelect("event.registeredMemberList", "registeredMemberList")
          .leftJoinAndSelect("member.user", "creatorUser")
          .leftJoinAndSelect("registeredMemberList.user", "participantUser")
          .leftJoinAndSelect("event.institution", "institution")
          .leftJoinAndSelect("event.eventCategory", "eventCategory")
          .leftJoinAndSelect("event.address", "address")
          .leftJoinAndSelect("event.image", "image")
          .where(
            "creatorUser.id = :userId OR participantUser.id = :userId",
            { userId }
          )
          .andWhere("event.dateTimeOfExecution >= :currentDateTime", { currentDateTime: new Date() });
      
        query.addOrderBy("event.dateTimeOfExecution", "ASC");
      
        return query.getMany();
      }
      
      

}