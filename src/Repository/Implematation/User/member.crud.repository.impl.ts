import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import MemberCrudRepositoryInterface from "src/Repository/Interface/User/member.crud.repository.interface";
import Member from "src/Model/User/member.entity";

@Injectable()
export default class MemberCrudRepositoryImpl extends BaseCrudRepository<Member> implements MemberCrudRepositoryInterface {
    
    constructor(@InjectRepository(Member) readonly repository: Repository<Member>){
        super(repository)
    }

}