import Config from "src/Model/User/config.entity";
import BaseCrudRepository from "../base.crud.repository";
import ConfigCrudRepositoryInterface from "src/Repository/Interface/User/config.crud.repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export default class ConfigCrudRepositoryImpl extends BaseCrudRepository<Config> implements ConfigCrudRepositoryInterface {
    
    constructor(@InjectRepository(Config) readonly repository: Repository<Config>){
        super(repository)
    }

}