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
import MemberCrudServiceInterface from "src/Service/Interface/User/member.crud.service.interface";
import Permission from "src/Model/Institution/permission.entity";

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

    protected async beforeSave(entity: Institution): Promise<void> {
        let code = 0
        while(1){
            code = Math.floor(100000 + Math.random() * 900000);
            const institution = await this.repository.getInstitutionByCode(code);

            if(!institution){
                break
            }
        }
        entity.code = code.toString()
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
        roleAdmin.name = 'Administrador'
        roleAdmin.permission = [{id: 1} as Permission,
                                {id: 2} as Permission,
                                {id: 3} as Permission,
                                {id: 4} as Permission,
                                {id: 5} as Permission]

        const roleUser = new Role()
        roleUser.name = 'Membro'

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
            institution: { id: data.idInstitution },
            user: { id: data.userId }
        });

        return this.membershipRequestService.save(membershipRequest);
    }

    async getInstitutionByCode(code: number): Promise<number>{
        const errorBuilder = new ErrorBuilder()
        const institution = await this.repository.getInstitutionByCode(code);

        if(!institution){
            errorBuilder.addErrorMessage("Instituição não encontrada!")

            errorBuilder.toThrowErrors()
        }
        return institution.id
    }

    async acceptEntry(id: number): Promise<Member> {
        const membershipRequest = await this.membershipRequestService.getById(id, ["institution"]);
        
        const member = new Member()
        member.institution = membershipRequest.institution
        member.user = membershipRequest.user
        member.role = (await this.getById(membershipRequest.institution.id)).roleList[1]

        const savedMember = await this.memberService.save(member)

        await this.membershipRequestService.delete(id)

        return savedMember;
    }

    async getMembers(id: number, search: string): Promise<Member[]> {
        if(!search){
            search=""
        }
        const memberList = (await this.getById(id)).memberList;
        
        const searchedMembers = memberList.filter(member => {
            const nameMemberUpperCase = member.user.name.toUpperCase()
            return nameMemberUpperCase.includes(search.toUpperCase())
        });
    
        return searchedMembers;
    }

    async getInstitutionsByUserId(id: number): Promise<Institution[]>{
        const listInstitutions = this.repository.getInstitutionsByUserId(id)

        return listInstitutions
    }

    async delete(id: number): Promise<void> {
        await this.repository.deleteAfterInstitution(id);
        await super.delete(id)
    }
   
}