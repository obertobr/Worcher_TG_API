import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ConfigCrudServiceInterface from "src/Service/Interface/User/config.crud.service.interface";
import ErrorBuilder from "src/Service/Validation/error.builder";
import User from "src/Model/User/user.entity";
import UserCrudRepositoryInterface from "src/Repository/Interface/User/user.crud.repository.interface";
import UserCrudServiceInterface from "src/Service/Interface/User/user.crud.service.interface";
import AccountCrudServiceInterface from "src/Service/Interface/User/account.crud.service.interface";

@Injectable()
export default class UserCrudServiceImpl extends BaseCrudService<User> implements UserCrudServiceInterface {

    private configService: ConfigCrudServiceInterface
    private accountService: AccountCrudServiceInterface
    
    constructor(@Inject(UserCrudRepositoryInterface) repository: UserCrudRepositoryInterface,
                @Inject(ConfigCrudServiceInterface) configService: ConfigCrudServiceInterface,
                @Inject(AccountCrudServiceInterface) accountService: AccountCrudServiceInterface
    ) {
        super(repository);
        this.configService = configService;
        this.accountService = accountService;
    }

    private isValidCPF(cpf) {
    
        // Verifica se o CPF tem 11 dígitos ou se é uma sequência de números repetidos
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
    
        // Calcula o primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let firstVerifier = (sum * 10) % 11;
        if (firstVerifier === 10 || firstVerifier === 11) {
            firstVerifier = 0;
        }
        if (firstVerifier !== parseInt(cpf.charAt(9))) {
            return false;
        }
    
        // Calcula o segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let secondVerifier = (sum * 10) % 11;
        if (secondVerifier === 10 || secondVerifier === 11) {
            secondVerifier = 0;
        }
        if (secondVerifier !== parseInt(cpf.charAt(10))) {
            return false;
        }
    
        return true;
    }

    protected beforeSave(entity: User): void {
        entity.cpf = entity.cpf.replace(/[^\d]+/g, '');
    }

    validate(entity: User): ErrorBuilder {
        const errorBuilder = new ErrorBuilder()

        if(entity.name == null){
            errorBuilder.addErrorMessage("Name is required")
        }
        if(entity.cpf == null){
            errorBuilder.addErrorMessage("cpf is required")
        } else if(!this.isValidCPF(entity.cpf)){
            errorBuilder.addErrorMessage("cpf is invalid")
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

        if(entity.account != null) {
            const accountErrors : string[] = this.accountService.validate(entity.account).errors
            if(accountErrors && accountErrors.length > 0) {
                errorBuilder.addErrorMessage(accountErrors)
            }
        } else {
            errorBuilder.addErrorMessage("Account is required")
        }

        return errorBuilder;
    }
   

}