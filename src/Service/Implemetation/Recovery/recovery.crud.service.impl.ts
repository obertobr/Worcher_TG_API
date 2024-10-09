import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";

import Address from "src/Model/Address/address.entity";

import Recovery from "src/Model/Recovery/recovery.entity";
import RecoveryCrudRepositoryInterface from "src/Repository/Interface/Recovery/recovery.crud.repository.interface";
import RecoveryCrudServiceInterface from "src/Service/Interface/Recovery/recovery.crud.service.interface";

@Injectable()
export default class RecoveryCrudServiceImpl extends BaseCrudService<Recovery> implements RecoveryCrudServiceInterface {
    
    constructor(@Inject(RecoveryCrudRepositoryInterface) repository: RecoveryCrudRepositoryInterface) {
        super(repository);
    }

    async validate(entity: Recovery): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()
        if(entity.recovery_code.toString().length !== 6){
            errorBuilder.addErrorMessage("wrong code")
        }else if(entity.recovery_code == null){
            errorBuilder.addErrorMessage("code cannot be empty")
        }

        return errorBuilder;
    }
}