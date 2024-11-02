import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Account from "src/Model/User/account.entity";
import AccountCrudRepositoryInterface from "src/Repository/Interface/User/account.crud.repository.interface";

@Injectable()
export default class AccountCrudRepositoryImpl extends BaseCrudRepository<Account> implements AccountCrudRepositoryInterface {
    
    constructor(@InjectRepository(Account) readonly repository: Repository<Account>){
        super(repository)
    }
    async findByEmail(email:string){
        return this.repository.createQueryBuilder('account')
        .leftJoinAndSelect('account.user', 'user')
        .where('account.email = :email', { email })
        .getOne();
    } 

    
}