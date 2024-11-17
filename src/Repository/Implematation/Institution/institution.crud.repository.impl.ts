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

    async getInstitutionByCode(code: number): Promise<Institution> {
        return this.repository
            .createQueryBuilder('institution')
            .where('institution.code = :code', { code })
            .getOne();
    }
    

    async getInstitutionsByUserId(userId: number): Promise<Institution[]> {
        return this.repository
            .createQueryBuilder('institution')
            .leftJoinAndSelect('institution.memberList', 'member')
            .leftJoinAndSelect('member.user', 'user')
            .where('user.id = :userId', { userId })
            .getMany();
    }
    

}