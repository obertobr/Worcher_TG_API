import AbstractCrudRepositoryInterface from "../abstract.crud.repository.interface";
import MembershipRequest from "src/Model/Institution/membershipRequest.entity";

export default abstract class MembershipRequestCrudRepositoryInterface extends AbstractCrudRepositoryInterface<MembershipRequest> {

    abstract existsByUserAndInstitution(userId: number, institutionId: number): Promise<boolean> 
    
}