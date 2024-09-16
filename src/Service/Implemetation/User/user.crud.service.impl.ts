import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ConfigCrudServiceInterface from "src/Service/Interface/User/config.crud.service.interface";
import ErrorBuilder from "src/Service/Validation/error.builder";
import User from "src/Model/User/user.entity";
import UserCrudRepositoryInterface from "src/Repository/Interface/User/user.crud.repository.interface";
import UserCrudServiceInterface from "src/Service/Interface/User/user.crud.service.interface";

@Injectable()
export default class UserCrudServiceImpl extends BaseCrudService<User> implements UserCrudServiceInterface {

    private configService: ConfigCrudServiceInterface
    
    constructor(@Inject(UserCrudRepositoryInterface) repository: UserCrudRepositoryInterface,
                @Inject(ConfigCrudServiceInterface) configService: ConfigCrudServiceInterface
    ) {
        super(repository);
        this.configService = configService;
    }

    validate(entity: User): ErrorBuilder {
        const errorBuilder = new ErrorBuilder()

        if(entity.name == null){
            errorBuilder.addErrorMessage("Name is required")
        }
        if(entity.cpf == null){
            errorBuilder.addErrorMessage("cpf is required")
        }
        if(entity.dateOfBirth == null){
            errorBuilder.addErrorMessage("Date of birth is required")
        }

        if(entity.config != null) {
            const configErrors : string[] = this.configService.validate(entity.config).errors
            if(configErrors && configErrors.length > 0) {
                errorBuilder.addErrorMessage(configErrors)
            }
        } else {
            errorBuilder.addErrorMessage("Config is required")
        }

        return errorBuilder;
    }
   

}