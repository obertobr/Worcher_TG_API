import Member from "src/Model/User/member.entity";
import AbstractCrudRepositoryInterface from "../abstract.crud.repository.interface";

export default abstract class MemberCrudRepositoryInterface extends AbstractCrudRepositoryInterface<Member> {

    abstract getMemberIdByInstitutionAndUser( institutionId: number, userId: number): Promise<number | null>
}