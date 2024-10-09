import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Recovery from "src/Model/Recovery/recovery.entity";
import RecoveryCrudRepositoryInterface from "src/Repository/Interface/Recovery/recovery.crud.repository.interface";


@Injectable()
export default class RecoveryCrudRepositoryImpl extends BaseCrudRepository<Recovery> implements RecoveryCrudRepositoryInterface {
    
    constructor(@InjectRepository(Recovery) readonly repository: Repository<Recovery>){
        super(repository)
    }

}