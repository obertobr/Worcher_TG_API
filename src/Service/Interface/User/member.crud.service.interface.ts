import Member from "src/Model/User/member.entity";
import AbstractCrudServiceInterface from "../abstract.crud.service.interface";
import Role from "src/Model/Institution/role.entity";

export default abstract class MemberCrudServiceInterface extends AbstractCrudServiceInterface<Member> {
    abstract alterRole(id:number,role:Role):Promise<Member>
    
}