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
import { DeepPartial } from "typeorm";
import AccountCrudRepositoryInterface from "src/Repository/Interface/User/account.crud.repository.interface";
import Account from "src/Model/User/account.entity";

import RecoveryCrudServiceInterface from "src/Service/Interface/Recovery/recovery.crud.service.interface";
import Recovery from "src/Model/Recovery/recovery.entity";
import ValidationExcpection from "src/Service/Validation/validation.exception";


@Injectable()
export default class UserCrudServiceImpl extends BaseCrudService<User> implements UserCrudServiceInterface {

    private configService: ConfigCrudServiceInterface
    private accountService: AccountCrudServiceInterface
    private serviceRecovery: RecoveryCrudServiceInterface
    private repositoryAccount: AccountCrudRepositoryInterface

    private emailService = new EmailService()
    constructor(@Inject(UserCrudRepositoryInterface) repository: UserCrudRepositoryInterface,
                @Inject(ConfigCrudServiceInterface) configService: ConfigCrudServiceInterface,
                @Inject(AccountCrudServiceInterface) accountService: AccountCrudServiceInterface,
                @Inject(AccountCrudRepositoryInterface) repositoryAccount: AccountCrudRepositoryInterface,
                @Inject(RecoveryCrudServiceInterface) serviceRecovery: RecoveryCrudServiceInterface,
    ) {
        super(repository);
        this.configService = configService;
        this.accountService = accountService;
        this.repositoryAccount = repositoryAccount;
        this.serviceRecovery = serviceRecovery
    }

    async login(email: string, password: string): Promise<User> {
       const account: Account = await this.accountService.findByEmail(email);

        if(!account) throw new ValidationExcpection(['Nenhuma conta foi encontrada com esse email!'],"Erro ao fazer login")

        if(!await bcrypt.compare(password, account.password)) throw new ValidationExcpection(['Senha incorreta!'],"Erro ao fazer login")

        return account.user;
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
    async findByCpf(cpf: string): Promise<User> {
        const repository = this.repository as UserCrudRepositoryInterface;

        return repository.findByCpf(cpf);
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
        if(await this.findByCpf(entity.cpf)){
            errorBuilder.addErrorMessage("não é possivel criar uma conta com esse CPF")
        }
        if(await this.checkEmail(entity.account.email)){
            errorBuilder.addErrorMessage("não é possivel criar uma conta com esse email")
        }
        if(entity.name == null){
            errorBuilder.addErrorMessage("Nome é nescessário")
        }
        if(entity.cpf == null){
            errorBuilder.addErrorMessage("CPF é nescessário")
        } else if(!this.isValidCPF(entity.cpf)){
            errorBuilder.addErrorMessage("CPF inválido")
        }
        if(entity.dateOfBirth == null){
            errorBuilder.addErrorMessage("Data de nascimento é nescessária")
        } else if(!this.hasMinimumAge(entity.dateOfBirth, 10)){
            errorBuilder.addErrorMessage("Abaixo da idade minima")
        }

        if(entity.config != null) {
            const configErrors : string[] = await this.configService.validate(entity.config).then( e => e.errors)
            if(configErrors && configErrors.length > 0) {
                errorBuilder.addErrorMessage(configErrors)
            }
        } else {
            errorBuilder.addErrorMessage("Configuração é nescessária")
        }

        if(entity.account != null) {
            const accountErrors : string[] = await this.accountService.validate(entity.account).then( e => e.errors)
            if(accountErrors && accountErrors.length > 0) {
                errorBuilder.addErrorMessage(accountErrors)
            }
        } else {
            errorBuilder.addErrorMessage("Conta é nescessária")
        }

        console.log(entity)
        return errorBuilder;
    }

    async recoveryPassword(email:string):Promise<{accountId:number}>{
        const errorBuilder = new ErrorBuilder()
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        let account:Account
        
        if(!regex.test(email)){
            errorBuilder.addErrorMessage('Email inválido')            
        }else{
            account = await this.repositoryAccount.findByEmail(email)
            if(account == null){
                errorBuilder.addErrorMessage('Não existe conta com esse email')           
            }
        }

        if(errorBuilder.hasErrors()){
            errorBuilder.toThrowErrors()
        }
        const code = Math.floor(100000+Math.random()*900000)
        const emails = this.emailService
        const data: DeepPartial<any> = {
            account:account, 
            recovery_code: code,
        };
        const recovery = await this.serviceRecovery.findRecoveryAccount(account)
        if(!recovery){
            
            await this.serviceRecovery.save(data)
        }else{
            recovery.recovery_code = code
            recovery.date_generation = new Date()
            await this.serviceRecovery.update(recovery)
        }
        await emails.sendEmail(account.email,"Recuperar senha","Código",`<p>${code}<p>`)
 
        return {accountId:account.id}
    }

    async recoveryCheck(id:number,code:number):Promise<void>{
        const errorBuilder = new ErrorBuilder()
        const account =await this.accountService.getById(id)
        let recovery: Recovery
        if(!account){
            errorBuilder.addErrorMessage('Conta não encontrada') 
        }else{
            recovery = await this.serviceRecovery.findRecoveryAccount(account)
            if(!recovery){
                errorBuilder.addErrorMessage('Código inválido')
            }else{
                if(recovery.recovery_code != code){
                    errorBuilder.addErrorMessage('Código inválido')
                }
            } 
            

        }
        if(errorBuilder.hasErrors()){
            errorBuilder.toThrowErrors()
            
        }
        await this.serviceRecovery.delete(recovery.id)
        return
    }

    async checkEmail(email:string): Promise<boolean>{
        const account: Account = await this.accountService.findByEmail(email);
        if(account){
            return true;

        }
        return false
    }

}