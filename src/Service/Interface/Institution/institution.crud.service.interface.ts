import AbstractCrudServiceInterface from "../abstract.crud.service.interface";
import Institution from "src/Model/Institution/institution.entity";
import { requestEntryInterface } from "./membershipRequest.crud.service.interface";
import MembershipRequest from "src/Model/Institution/membershipRequest.entity";
import User from "src/Model/User/user.entity";
import Member from "src/Model/User/member.entity";

export default abstract class InstitutionCrudServiceInterface extends AbstractCrudServiceInterface<Institution> {

    abstract requestEntry(data: requestEntryInterface): Promise<MembershipRequest>

    abstract createInstitution(institution: Institution, user: User): Promise<Institution>
    
    abstract getInstitutionByCode(code: number): Promise<number>

    abstract acceptEntry(id: number): Promise<Member>
}