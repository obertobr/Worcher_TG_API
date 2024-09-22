import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Role from "src/Model/Institution/role.entity";
import RoleCrudRepositoryInterface from "src/Repository/Interface/Institution/role.crud.repository.interface";

@Injectable()
export default class RoleCrudRepositoryImpl extends BaseCrudRepository<Role> implements RoleCrudRepositoryInterface {
    
    constructor(@InjectRepository(Role) readonly repository: Repository<Role>){
        super(repository)
    }

}