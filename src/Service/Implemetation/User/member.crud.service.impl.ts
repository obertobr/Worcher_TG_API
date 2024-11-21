import { Repository } from 'typeorm';
import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Member from "src/Model/User/member.entity";
import MemberCrudServiceInterface from "src/Service/Interface/User/member.crud.service.interface";
import MemberCrudRepositoryInterface from "src/Repository/Interface/User/member.crud.repository.interface";
import RoleCrudServiceInterface from "src/Service/Interface/Institution/role.crud.service.interface";
import UserCrudServiceInterface from "src/Service/Interface/User/user.crud.service.interface";
import Role from "src/Model/Institution/role.entity";
import ValidationExcpection from 'src/Service/Validation/validation.exception';

@Injectable()
export default class MemberCrudServiceImpl extends BaseCrudService<Member> implements MemberCrudServiceInterface {   
    
    private serviceRole: RoleCrudServiceInterface;
    private serviceUser: UserCrudServiceInterface;
    private repositoryMember: MemberCrudRepositoryInterface;
    
    constructor(@Inject(MemberCrudRepositoryInterface) repository: MemberCrudRepositoryInterface,
                @Inject(RoleCrudServiceInterface) serviceRole: RoleCrudServiceInterface,
                @Inject(UserCrudServiceInterface) serviceUser: UserCrudServiceInterface
) {
        super(repository);
        this.serviceRole = serviceRole;
        this.serviceUser = serviceUser;
        this.repositoryMember = repository

    }
   
    async validate(entity: Member): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.user == null){
            errorBuilder.addErrorMessage("É nescessaior informar um usuário")
        } else if(await this.serviceUser.getById(entity.user.id) == null){
            errorBuilder.addErrorMessage("Usuário não existe")
        }

        if(entity.role == null){
            errorBuilder.addErrorMessage("É nescessaior informar um papel")
        } else if(await this.serviceRole.getById(entity.role.id) == null){
            errorBuilder.addErrorMessage("Papel não existe")
        }

        return errorBuilder;
    }
    async alterRole(id:number,role:Role):Promise<Member>{
          const userRole =await this.getById(id,["user"])
          userRole.role = role 
          return await this.update(userRole)  
    }

    async getMemberIdByInstitutionAndUser(institutionId: number, userId: number): Promise<number | null>{
        if(!institutionId || !userId)
            throw new ValidationExcpection(["É nessário informar o id da instituição e do usuario"])

        return this.repositoryMember.getMemberIdByInstitutionAndUser(institutionId,userId)
    }
}