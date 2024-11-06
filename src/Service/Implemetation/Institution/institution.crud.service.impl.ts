import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Institution from "src/Model/Institution/institution.entity";
import InstitutionCrudRepositoryInterface from "src/Repository/Interface/Institution/institution.crud.repository.interface";
import InstitutionCrudServiceInterface from "src/Service/Interface/Institution/institution.crud.service.interface";
import MembershipRequest from "src/Model/Institution/membershipRequest.entity";
import MembershipRequestCrudServiceInterface, { requestEntryInterface } from "src/Service/Interface/Institution/membershipRequest.crud.service.interface";
import User from "src/Model/User/user.entity";
import Member from "src/Model/User/member.entity";
import Role from "src/Model/Institution/role.entity";
import MemberCrudRepositoryInterface from "src/Repository/Interface/User/member.crud.repository.interface";
import MemberCrudServiceInterface from "src/Service/Interface/User/member.crud.service.interface";

@Injectable()
export default class InstitutionCrudServiceImpl extends BaseCrudService<Institution> implements InstitutionCrudServiceInterface {

    membershipRequestService: MembershipRequestCrudServiceInterface;
    memberService: MemberCrudServiceInterface;
    repository: InstitutionCrudRepositoryInterface;
    
    constructor(@Inject(InstitutionCrudRepositoryInterface) repository: InstitutionCrudRepositoryInterface,
                @Inject(MembershipRequestCrudServiceInterface) membershipRequestService: MembershipRequestCrudServiceInterface,
                @Inject(MemberCrudServiceInterface) memberService: MemberCrudServiceInterface) {
        super(repository);

        this.repository = repository
        this.memberService = memberService;
        this.membershipRequestService = membershipRequestService;
    }

    protected beforeSave(entity: Institution): void {
        entity.code = Math.floor(100000 + Math.random() * 900000).toString();
    }

    async validate(entity: Institution): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.name == null){
            errorBuilder.addErrorMessage("não é possivel criar uma instituição sem nome")
        }

        return errorBuilder;
    }

    async createInstitution(institution: Institution, user: User): Promise<Institution>{
        const roleAdmin = new Role()
        roleAdmin.name = 'Admin'

        const roleUser = new Role()
        roleUser.name = 'User'

        institution.roleList = [roleAdmin, roleUser]

        const savedInstitution = await this.save(institution)

        if(savedInstitution){
            const member = new Member()
            member.user = user
            member.role = savedInstitution.roleList[0]
            member.institution = savedInstitution

            await this.memberService.save(member)
        }

        return savedInstitution
    }

    async requestEntry(data: requestEntryInterface) {
        const membershipRequest = new MembershipRequest()
        Object.assign(membershipRequest, {
            institution: { id: data.institutionId },
            user: { id: data.userId }
        });

        return this.membershipRequestService.save(membershipRequest);
    }

    async getInstitutionByCode(code: number){
        const errorBuilder = new ErrorBuilder()
        const institution = await this.repository.getInstitutionByCode(code);
        if(!institution){
            errorBuilder.addErrorMessage("instituição não encontrada!")

            errorBuilder.toThrowErrors()
        }
        return institution.id
    }
   

}