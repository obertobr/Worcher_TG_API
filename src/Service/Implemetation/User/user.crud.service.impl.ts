import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ConfigCrudServiceInterface from "src/Service/Interface/User/config.crud.service.interface";
import ErrorBuilder from "src/Service/Validation/error.builder";
import User from "src/Model/User/user.entity";
import UserCrudRepositoryInterface from "src/Repository/Interface/User/user.crud.repository.interface";
import UserCrudServiceInterface from "src/Service/Interface/User/user.crud.service.interface";
import AccountCrudServiceInterface from "src/Service/Interface/User/account.crud.service.interface";
import { EmailService } from "../Email/email.service";


import * as bcrypt from 'bcrypt';
import { UserRepositoryModule } from "src/Repository/Implematation/User/user.repository.module";
import AccountCrudRepositoryImpl from "src/Repository/Implematation/User/account.crud.repository.impl";
import { Repository } from "typeorm";
import AccountCrudRepositoryInterface from "src/Repository/Interface/User/account.crud.repository.interface";
import Account from "src/Model/User/account.entity";


@Injectable()
export default class UserCrudServiceImpl extends BaseCrudService<User> implements UserCrudServiceInterface {

    private configService: ConfigCrudServiceInterface
    private accountService: AccountCrudServiceInterface

    private repositoryAccount: AccountCrudRepositoryInterface

    private emailService = new EmailService()
    constructor(@Inject(UserCrudRepositoryInterface) repository: UserCrudRepositoryInterface,
                @Inject(ConfigCrudServiceInterface) configService: ConfigCrudServiceInterface,
                @Inject(AccountCrudServiceInterface) accountService: AccountCrudServiceInterface,
                @Inject(AccountCrudRepositoryInterface) repositoryAccount: AccountCrudRepositoryInterface
                
    ) {
        super(repository);
        this.configService = configService;
        this.accountService = accountService;
        this.repositoryAccount = repositoryAccount;
    }

    private isValidCPF(cpf: string) {
    
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

    private hasMinimumAge(dateOfBirth: Date, minimumAge: number) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);

        const minAgeDate = new Date(today.getFullYear() - minimumAge, today.getMonth(), today.getDate());
        return birthDate <= minAgeDate;
    }

    protected beforeSave(entity: User): void {
        entity.cpf = entity.cpf.replace(/[^\d]+/g, '');
    }

    protected async beforeInsert(entity: User): Promise<void> {
        entity.account.password = await bcrypt.hash(entity.account.password, 10);
    }

   async validate(entity: User): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.name == null){
            errorBuilder.addErrorMessage("Name is required")
        }
        if(entity.cpf == null){
            errorBuilder.addErrorMessage("CPF is required")
        } else if(!this.isValidCPF(entity.cpf)){
            errorBuilder.addErrorMessage("CPF is invalid")
        }
        if(entity.dateOfBirth == null){
            errorBuilder.addErrorMessage("Date of birth is required")
        } else if(!this.hasMinimumAge(entity.dateOfBirth, 12)){
            errorBuilder.addErrorMessage("Below the minimum age")
        }

        if(entity.config != null) {
            const configErrors : string[] = await this.configService.validate(entity.config).then( e => e.errors)
            if(configErrors && configErrors.length > 0) {
                errorBuilder.addErrorMessage(configErrors)
            }
        } else {
            errorBuilder.addErrorMessage("Config is required")
        }

        if(entity.account != null) {
            const accountErrors : string[] = await this.accountService.validate(entity.account).then( e => e.errors)
            if(accountErrors && accountErrors.length > 0) {
                errorBuilder.addErrorMessage(accountErrors)
            }
        } else {
            errorBuilder.addErrorMessage("Account is required")
        }

        console.log(entity)
        return errorBuilder;
    }
    async recoveryPassword(email:string):Promise<void>{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        let account:any
        if(regex.test(email)){
            account = await this.repositoryAccount.findByEmail(email)
        }else{
            return
        }


        const codigo = Math.floor(100000+Math.random()*900000)
        const emails = this.emailService
        await emails.sendEmail(account.email,"password recovery","your password",`<p>${codigo}<p>`)
        

        
        return 
    }

}