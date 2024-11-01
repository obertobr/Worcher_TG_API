import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Permission from "src/Model/Institution/permission.entity";
import PermissionCrudServiceInterface from "src/Service/Interface/Institution/permission.crud.service.interface";
import PermissionCrudRepositoryInterface from "src/Repository/Interface/Institution/permission.crud.repository.interface";

@Injectable()
export default class PermissionCrudServiceImpl extends BaseCrudService<Permission> implements PermissionCrudServiceInterface {
    
    constructor(@Inject(PermissionCrudRepositoryInterface) repository: PermissionCrudRepositoryInterface) {
        super(repository);
    }

    async validate(entity: Permission): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.name == null){
            errorBuilder.addErrorMessage("não é possivel criar permissões sem nome")
        }

        return errorBuilder;
    }
   

}