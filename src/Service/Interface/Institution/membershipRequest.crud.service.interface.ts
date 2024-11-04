import AbstractCrudServiceInterface from "../abstract.crud.service.interface";
import MembershipRequest from "src/Model/Institution/membershipRequest.entity";

export default abstract class MembershipRequestCrudServiceInterface extends AbstractCrudServiceInterface<MembershipRequest> {

    
}

export class requestEntryInterface {
    institutionId: number;
    userId: number;
}