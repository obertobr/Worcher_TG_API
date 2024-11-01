import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import State from "src/Model/Address/state.entity";
import StateCrudServiceInterface from "src/Service/Interface/Address/state.crud.service.interface";
import StateCrudRepositoryInterface from "src/Repository/Interface/Address/state.crud.repository.interface";

@Injectable()
export default class StateCrudServiceImpl extends BaseCrudService<State> implements StateCrudServiceInterface {
    
    constructor(@Inject(StateCrudRepositoryInterface) repository: StateCrudRepositoryInterface) {
        super(repository);
    }

    async validate(entity: State): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()
        if(entity.name == null){
            errorBuilder.addErrorMessage("Nome é nescessário")
        }

        if(entity.uf == null){
            errorBuilder.addErrorMessage("Nome é nescessário")
        }

        return errorBuilder;
    }
}