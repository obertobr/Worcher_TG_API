import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import State from "src/Model/Address/state.entity";
import StateCrudRepositoryInterface from "src/Repository/Interface/Address/state.crud.repository.interface";

@Injectable()
export default class StateCrudRepositoryImpl extends BaseCrudRepository<State> implements StateCrudRepositoryInterface {
    
    constructor(@InjectRepository(State) readonly repository: Repository<State>){
        super(repository)
    }

}