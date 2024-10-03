import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import State from "src/Model/Address/state.entity";
import City from "src/Model/Address/city.entity";
import CityCrudRepositoryInterface from "src/Repository/Interface/Address/city.crud.repository.interface";

@Injectable()
export default class CityCrudRepositoryImpl extends BaseCrudRepository<City> implements CityCrudRepositoryInterface {
    
    constructor(@InjectRepository(City) readonly repository: Repository<City>){
        super(repository)
    }

}