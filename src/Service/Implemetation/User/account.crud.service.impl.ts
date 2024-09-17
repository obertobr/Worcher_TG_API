import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Account from "src/Model/User/account.entity";
import AccountCrudServiceInterface from "src/Service/Interface/User/account.crud.service.interface";
import AccountCrudRepositoryInterface from "src/Repository/Interface/User/account.crud.repository.interface";

@Injectable()
export default class AccountCrudServiceImpl extends BaseCrudService<Account> implements AccountCrudServiceInterface {
    
    constructor(@Inject(AccountCrudRepositoryInterface) repository: AccountCrudRepositoryInterface) {
        super(repository);
    }

    private isEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    private isValidPassword(password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
    }

    validate(entity: Account): ErrorBuilder {
        const errorBuilder = new ErrorBuilder()

        if(entity.email == null){
            errorBuilder.addErrorMessage("Email is required")
        } else if(!this.isEmail(entity.email)) {
            errorBuilder.addErrorMessage("Email is invalid")
        }
        if(entity.password == null){
            errorBuilder.addErrorMessage("Password is required")
        } else if(!this.isValidPassword(entity.password)){
            errorBuilder.addErrorMessage("Password is invalid")
        }

        return errorBuilder;
    }
   

}