import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Event from "src/Model/Event/event.entity";
import EventCrudServiceInterface from "src/Service/Interface/Event/event.crud.service.interface";
import EventCrudRepositoryInterface from "src/Repository/Interface/Event/event.crud.repository.interface";
import MemberCrudServiceInterface from "src/Service/Interface/User/member.crud.service.interface";
import ValidationExcpection from "src/Service/Validation/validation.exception";

@Injectable()
export default class EventCrudServiceImpl extends BaseCrudService<Event> implements EventCrudServiceInterface {
    
    private serviceMember: MemberCrudServiceInterface;
    private repositoryEvent: EventCrudRepositoryInterface;

    constructor(@Inject(EventCrudRepositoryInterface) repository: EventCrudRepositoryInterface,
                @Inject(MemberCrudServiceInterface) _serviceMember: MemberCrudServiceInterface) {
        super(repository);

        this.serviceMember = _serviceMember;
        this.repositoryEvent = repository
    }

    protected beforeSave(entity: Event): void {
        entity.creationDateTime = new Date();
    }

    async validate(entity: Event): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        console.log(entity)

        if(entity.name == null){
            errorBuilder.addErrorMessage("é nescessário informar o nome")
        } else if(entity.name.length < 4) {
            errorBuilder.addErrorMessage("Nome do evento deve ter pelo menos 4 caracteres de tamanho")
        }

        if(entity.description == null){
            errorBuilder.addErrorMessage("é nescessário informar a Descrição")
        }

        if(entity.dateTimeOfExecution == null){
            errorBuilder.addErrorMessage("é nescessário informar a data em que o evento será realizado")
        }

        if(entity.member == null){
            errorBuilder.addErrorMessage("é nescessário informar o membro que está criando o evento")
        }else if(!(await this.serviceMember.getById(entity.member.id))){
            errorBuilder.addErrorMessage("o membro informado não existe")
        }

        if(entity.eventCategory == null){
            errorBuilder.addErrorMessage(" A categoria do evento deve ser informada!")
        }

        return errorBuilder;
    }

    getEventsByInstitutionAndCategory(institutionId: number, idCategory?: number | null): Promise<Event[]> {
        if(!institutionId) throw new ValidationExcpection(["O id da instituição não foi informado!"])

            return this.repositoryEvent.getEventsByInstitutionAndCategory(institutionId,idCategory)
    }

    async addMemberToEvent(eventId: number, memberId: number): Promise<void> {

        const event = await this.repositoryEvent.getEventWithRegisteredMemberList(eventId)
    
        if (!event) {
          throw new ValidationExcpection([`Event with id ${eventId} not found`]);
        }
    
        const memberExists = event.registeredMemberList.some(
          (member) => member.id === memberId
        );
    
        if (memberExists) {
          throw new ValidationExcpection([`Member with id ${memberId} is already registered in the event`]);
        }
    
        const member = await this.serviceMember.getById(memberId);;

        if (!member) {
          throw new ValidationExcpection([`Member with id ${memberId} not found`]);
        }
    
        event.registeredMemberList.push(member);
    
        await this.repositoryEvent.save(event);
      }

      async removeMemberFromEvent(eventId: number, memberId: number): Promise<void> {
        const event = await this.repositoryEvent.getEventWithRegisteredMemberList(eventId)
    
        if (!event) {
            throw new ValidationExcpection([`Event with id ${eventId} not found`]);
        }
      
        const memberIndex = event.registeredMemberList.findIndex(
          (member) => member.id === memberId
        );
      
        if (memberIndex === -1) {
          throw new Error(`Member with id ${memberId} is not registered in the event`);
        }
      
        event.registeredMemberList.splice(memberIndex, 1);
      
        await this.repositoryEvent.save(event);
      }

      async removeMemberFromEventByUser(eventId: number, userId: number): Promise<void> {
        const event = await this.repositoryEvent.getEventWithRegisteredMemberList(eventId);
      
        if (!event) {
          throw new ValidationExcpection([`Event with id ${eventId} not found`]);
        }
      
        const member = event.registeredMemberList.find(
          (member) => member.user.id === userId
        );
      
        if (!member) {
          throw new Error(`User with id ${userId} is not registered in the event`);
        }
      
        event.registeredMemberList = event.registeredMemberList.filter(
          (registeredMember) => registeredMember.id !== member.id
        );
      
        await this.repositoryEvent.save(event);
      }
      
      
    
      getEventsByUser(userId: number): Promise<Event[]>{
        if(!userId)
          throw new Error("Não foi informado o id do usuario!");

        return this.repositoryEvent.getEventsByUser(userId);
      }
      
}