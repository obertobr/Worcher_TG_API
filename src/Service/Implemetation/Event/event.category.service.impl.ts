import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import EventCategory from "src/Model/Event/event.category.entity";
import EventCategoryCrudServiceInterface from "src/Service/Interface/Event/event.category.crud.service.interface";
import EventCategoryCrudRepositoryInterface from "src/Repository/Interface/Event/event.category.crud.repository.interface";

@Injectable()
export default class EventCategoryCrudServiceImpl extends BaseCrudService<EventCategory> implements EventCategoryCrudServiceInterface {
    
    constructor(@Inject(EventCategoryCrudRepositoryInterface) repository: EventCategoryCrudRepositoryInterface) {
        super(repository);
    }

    async validate(entity: EventCategory): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.name == null){
            errorBuilder.addErrorMessage("É nescesário informar o nome")
        } else if(entity.name.length < 4) {
            errorBuilder.addErrorMessage("Nome do evento deve ter pelo menos 4 caracteres de tamanho")
        }

        return errorBuilder;
    }
   

}