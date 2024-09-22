import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Event from "src/Model/Event/event.entity";
import EventCrudServiceInterface from "src/Service/Interface/Event/event.crud.service.interface";
import EventCrudRepositoryInterface from "src/Repository/Interface/Event/event.crud.repository.interface";
import MemberCrudServiceInterface from "src/Service/Interface/User/member.crud.service.interface";

@Injectable()
export default class EventCrudServiceImpl extends BaseCrudService<Event> implements EventCrudServiceInterface {
    
    private serviceMember: MemberCrudServiceInterface;

    constructor(@Inject(EventCrudRepositoryInterface) repository: EventCrudRepositoryInterface,
                @Inject(MemberCrudServiceInterface) _serviceMember: MemberCrudServiceInterface) {
        super(repository);

        this.serviceMember = _serviceMember;
    }

    protected beforeSave(entity: Event): void {
        entity.creationDateTime = new Date();
    }

    async validate(entity: Event): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.name == null){
            errorBuilder.addErrorMessage("Name is required")
        } else if(entity.name.length < 4) {
            errorBuilder.addErrorMessage("Event name must be at least 4 characters long")
        }

        if(entity.description == null){
            errorBuilder.addErrorMessage("Description is required")
        }

        if(entity.dateTimeOfExecution == null){
            errorBuilder.addErrorMessage("The date on which the event will take place is required")
        }

        if(entity.member == null){
            errorBuilder.addErrorMessage("the member who created the event is required")
        }else if(await this.serviceMember.getById(entity.member.id)){
            errorBuilder.addErrorMessage("the informed member does not exist")
        }

        return errorBuilder;
    }
}