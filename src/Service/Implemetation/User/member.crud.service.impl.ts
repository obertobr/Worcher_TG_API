import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Member from "src/Model/User/member.entity";
import MemberCrudServiceInterface from "src/Service/Interface/User/member.crud.service.interface";
import MemberCrudRepositoryInterface from "src/Repository/Interface/User/member.crud.repository.interface";
import Role from "src/Model/Institution/role.entity";
import RoleCrudRepositoryImpl from "src/Repository/Implematation/Institution/role.crud.repository.impl";
import RoleCrudRepositoryInterface from "src/Repository/Interface/Institution/role.crud.repository.interface";

@Injectable()
export default class MemberCrudServiceImpl extends BaseCrudService<Member> implements MemberCrudServiceInterface {   
    
    private roleRepository: RoleCrudRepositoryInterface 
    
    constructor(@Inject(MemberCrudRepositoryInterface) repository: MemberCrudRepositoryInterface,
                @Inject(RoleCrudRepositoryInterface) roleRepository: RoleCrudRepositoryInterface
) {
        super(repository);
        this.roleRepository = roleRepository;
    }
   
    async validate(entity: Member): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.user == null){
            errorBuilder.addErrorMessage("It is necessary to inform the user")
        }
        return errorBuilder;
    }

}