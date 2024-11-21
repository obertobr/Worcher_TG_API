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


    async getMemberIdByInstitutionAndUser( institutionId: number, userId: number): Promise<number | null> {
        const result = await this.repository
          .createQueryBuilder('member')
          .select('member.id', 'id')
          .innerJoin('member.user', 'user')
          .innerJoin('member.institution', 'institution')
          .where('institution.id = :institutionId', { institutionId })
          .andWhere('user.id = :userId', { userId })
          .getRawOne();
      
        return result ? result.id : null;
      }
      

}