import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Institution from "src/Model/Institution/institution.entity";
import InstitutionCrudRepositoryInterface from "src/Repository/Interface/Institution/institution.crud.repository.interface";

@Injectable()
export default class InstitutionCrudRepositoryImpl extends BaseCrudRepository<Institution> implements InstitutionCrudRepositoryInterface {
    
    constructor(@InjectRepository(Institution) readonly repository: Repository<Institution>){
        super(repository)
    }

}