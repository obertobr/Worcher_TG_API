import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Account from "src/Model/User/account.entity";
import AccountCrudServiceInterface from "src/Service/Interface/User/account.crud.service.interface";
import AccountCrudRepositoryInterface from "src/Repository/Interface/User/account.crud.repository.interface";
import * as bcrypt from 'bcrypt';


@Injectable()
export default class AccountCrudServiceImpl extends BaseCrudService<Account> implements AccountCrudServiceInterface {
    
    constructor(@Inject(AccountCrudRepositoryInterface) repository: AccountCrudRepositoryInterface) {
        super(repository);
    }

    findByEmail(email: string): Promise<Account> {
        const repository = this.repository as AccountCrudRepositoryInterface;

        return repository.findByEmail(email);
    }

    private isEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    private isValidPassword(password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }

    protected async beforeInsert(entity: Account): Promise<void> {
        entity.password = await bcrypt.hash(entity.password, 10);
    }

    async validate(entity: Account): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.email == null){
            errorBuilder.addErrorMessage("É nescessário informar o email")
        } else if(!this.isEmail(entity.email)) {
            errorBuilder.addErrorMessage("Email inválido")
        }
        if(entity.password == null){
            errorBuilder.addErrorMessage("É nescessário informar a senha")
        } else if(!this.isValidPassword(entity.password)){
            errorBuilder.addErrorMessage("Senha inválida")
        }

        return errorBuilder;
    }
   

}