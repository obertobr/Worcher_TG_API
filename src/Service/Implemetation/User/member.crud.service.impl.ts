import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Member from "src/Model/User/member.entity";
import MemberCrudServiceInterface from "src/Service/Interface/User/member.crud.service.interface";
import MemberCrudRepositoryInterface from "src/Repository/Interface/User/member.crud.repository.interface";
import RoleCrudServiceInterface from "src/Service/Interface/Institution/role.crud.service.interface";
import UserCrudServiceInterface from "src/Service/Interface/User/user.crud.service.interface";

@Injectable()
export default class MemberCrudServiceImpl extends BaseCrudService<Member> implements MemberCrudServiceInterface {   
    
    private serviceRole: RoleCrudServiceInterface;
    private serviceUser: UserCrudServiceInterface;
    
    constructor(@Inject(MemberCrudRepositoryInterface) repository: MemberCrudRepositoryInterface,
                @Inject(RoleCrudServiceInterface) serviceRole: RoleCrudServiceInterface,
                @Inject(UserCrudServiceInterface) serviceUser: UserCrudServiceInterface
) {
        super(repository);
        this.serviceRole = serviceRole;
        this.serviceUser = serviceUser;
    }
   
    async validate(entity: Member): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.user == null){
            errorBuilder.addErrorMessage("It is necessary to inform the user")
        } else if(await this.serviceUser.getById(entity.user.id) == null){
            errorBuilder.addErrorMessage("User does not exist")
        }

        if(entity.role == null){
            errorBuilder.addErrorMessage("It is necessary to inform the role")
        } else if(await this.serviceRole.getById(entity.role.id) == null){
            errorBuilder.addErrorMessage("Role does not exist")
        }

        return errorBuilder;
    }

}