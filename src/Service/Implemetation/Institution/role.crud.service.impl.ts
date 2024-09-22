import Config from "src/Model/User/config.entity";
import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Role from "src/Model/Institution/role.entity";
import RoleCrudServiceInterface from "src/Service/Interface/Institution/role.crud.service.interface";
import RoleCrudRepositoryInterface from "src/Repository/Interface/Institution/role.crud.repository.interface";

@Injectable()
export default class RoleCrudServiceImpl extends BaseCrudService<Role> implements RoleCrudServiceInterface {
    
    constructor(@Inject(RoleCrudRepositoryInterface) repository: RoleCrudRepositoryInterface) {
        super(repository);
    }

    validate(entity: Role): ErrorBuilder {
        const errorBuilder = new ErrorBuilder()

        if(entity.name == null){
            errorBuilder.addErrorMessage("It is not possible to create a position without a name")
        }

        return errorBuilder;
    }
   

}