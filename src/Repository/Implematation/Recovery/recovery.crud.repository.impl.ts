import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import Recovery from "src/Model/Recovery/recovery.entity";
import RecoveryCrudRepositoryInterface from "src/Repository/Interface/Recovery/recovery.crud.repository.interface";
import Account from "src/Model/User/account.entity";
import { Module } from "@nestjs/common";

@Injectable()
export default class RecoveryCrudRepositoryImpl extends BaseCrudRepository<Recovery> implements RecoveryCrudRepositoryInterface {
    
    constructor(@InjectRepository(Recovery) readonly repository: Repository<Recovery>){
        super(repository)
    }

    async findRecoveryAccount(account:Account){
        return this.repository.findOne({
            where: {account}
        })
    } 
    async findByDate( expirationTime:Date){
       
        return  await this.repository.find({
            where: {
              date_generation:  LessThan(expirationTime) , 
            },
          });
    }
}