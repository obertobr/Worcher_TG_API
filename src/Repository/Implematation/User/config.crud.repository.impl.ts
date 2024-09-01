import Config from "src/Model/User/config.entity";
import BaseCrudRepository from "../base.crud.repository";
import ConfigCrudRepositoryInterface from "src/Repository/Interface/User/config.crud.repository.interface";
import { Injectable } from "@nestjs/common";
import { InjectableImpl } from "src/Injectable/injectable.impl";

@Injectable()
@InjectableImpl(Symbol('ConfigCrudRepositoryInterface'))
export default class ConfigCrudRepositoryImpl extends BaseCrudRepository<Config> implements ConfigCrudRepositoryInterface {
    
    getTeste() {
        return "Teste";
    }

    


}