import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Institution from "src/Model/Institution/institution.entity";
import InstitutionCrudRepositoryInterface from "src/Repository/Interface/Institution/institution.crud.repository.interface";
import Role from "src/Model/Institution/role.entity";
import Member from "src/Model/User/member.entity";
import Event from "src/Model/Event/event.entity";
import EventCategory from "src/Model/Event/event.category.entity";

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
            .leftJoinAndSelect('institution.image', 'image')
            .where('user.id = :userId', { userId })
            .getMany();
    }

    async deleteAfterInstitution(institutionId: number): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .delete()
            .from(Event)
            .where('institution.id = :institutionId', { institutionId })
            .execute();

        await this.repository
            .createQueryBuilder()
            .delete()
            .from(EventCategory)
            .where('institution.id = :institutionId', { institutionId })
            .execute();

        await this.repository
            .createQueryBuilder()
            .delete()
            .from(Member)
            .where('institution.id = :institutionId', { institutionId })
            .execute();

        await this.repository
            .createQueryBuilder()
            .delete()
            .from(Role)
            .where('institution.id = :institutionId', { institutionId })
            .execute();
    
    }
    

}