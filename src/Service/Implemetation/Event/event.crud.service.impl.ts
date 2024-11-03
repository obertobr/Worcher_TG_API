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

        return errorBuilder;
    }
}