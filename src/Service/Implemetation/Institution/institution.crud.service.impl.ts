import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Role from "src/Model/Institution/role.entity";
import Institution from "src/Model/Institution/institution.entity";
import InstitutionCrudRepositoryInterface from "src/Repository/Interface/Institution/institution.crud.repository.interface";
import InstitutionCrudServiceInterface from "src/Service/Interface/Institution/institution.crud.service.interface";

@Injectable()
export default class InstitutionCrudServiceImpl extends BaseCrudService<Institution> implements InstitutionCrudServiceInterface {
    
    constructor(@Inject(InstitutionCrudRepositoryInterface) repository: InstitutionCrudRepositoryInterface) {
        super(repository);
    }

    protected beforeSave(entity: Institution): void {
        entity.code = Math.floor(100000 + Math.random() * 900000).toString();
    }

    async validate(entity: Institution): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.name == null){
            errorBuilder.addErrorMessage("It is not possible to create a institution without a name")
        }

        return errorBuilder;
    }
   

}