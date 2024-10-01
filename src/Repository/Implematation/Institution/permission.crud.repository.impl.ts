import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Permission from "src/Model/Institution/permission.entity";
import PermissionCrudRepositoryInterface from "src/Repository/Interface/Institution/permission.crud.repository.interface";

@Injectable()
export default class PermissionCrudRepositoryImpl extends BaseCrudRepository<Permission> implements PermissionCrudRepositoryInterface {
    
    constructor(@InjectRepository(Permission) readonly repository: Repository<Permission>){
        super(repository)
    }

}