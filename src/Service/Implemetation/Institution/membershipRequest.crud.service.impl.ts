import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import MembershipRequestCrudServiceInterface from "src/Service/Interface/Institution/membershipRequest.crud.service.interface";
import MembershipRequestCrudRepositoryInterface from "src/Repository/Interface/Institution/membershipRequest.crud.repository.interface";
import MembershipRequest from "src/Model/Institution/membershipRequest.entity";

@Injectable()
export default class MembershipRequestCrudServiceImpl extends BaseCrudService<MembershipRequest> implements MembershipRequestCrudServiceInterface {
    
    protected repository: MembershipRequestCrudRepositoryInterface;

    constructor(@Inject(MembershipRequestCrudRepositoryInterface) repository: MembershipRequestCrudRepositoryInterface) {
        super(repository);

        this.repository = repository
    }

    async validate(entity: MembershipRequest): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.user == null){
            errorBuilder.addErrorMessage("não é possivel criar requisitar o acesso a uma instituição sem um usúario")
        }

        if(entity.institution == null){
            errorBuilder.addErrorMessage("instituição não informada")
        }

        if(await this.repository.existsByUserAndInstitution(entity.user.id, entity.institution.id)){
            errorBuilder.addErrorMessage("Este usúario ja fez uma solitação para entrar nessa instituição")
        }

        return errorBuilder;
    }
   

}