import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "src/Model/User/user.entity";
import UserCrudRepositoryInterface from "src/Repository/Interface/User/user.crud.repository.interface";

@Injectable()
export default class UserCrudRepositoryImpl extends BaseCrudRepository<User> implements UserCrudRepositoryInterface {
    
    constructor(@InjectRepository(User) readonly repository: Repository<User>){
        super(repository)
    }

}