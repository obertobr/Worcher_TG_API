import Config from "src/Model/User/config.entity";
import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ConfigCrudServiceInterface from "src/Service/Interface/User/config.crud.service.interface";
import ErrorBuilder from "src/Service/Validation/error.builder";
import ConfigCrudRepositoryInterface from 'src/Repository/Interface/User/config.crud.repository.interface';

@Injectable()
export default class ConfigCrudServiceImpl extends BaseCrudService<Config> implements ConfigCrudServiceInterface {
    
    constructor(@Inject(ConfigCrudRepositoryInterface) repository: ConfigCrudRepositoryInterface) {
        super(repository);
    }

    async validate(entity: Config): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()
        
        if(entity.recieveEmails == null){
            errorBuilder.addErrorMessage("Não é possível criar uma configuração sem identificar se o usuario quer receber emails")
        }

        if(entity.recieveNotifications == null){
            errorBuilder.addErrorMessage("Não é possível criar uma configuração sem identificar se o usuario quer receber notificações")
        }

        return errorBuilder;
    }
   

}