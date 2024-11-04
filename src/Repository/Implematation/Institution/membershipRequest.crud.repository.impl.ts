import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import MembershipRequest from "src/Model/Institution/membershipRequest.entity";
import MembershipRequestCrudRepositoryInterface from "src/Repository/Interface/Institution/membershipRequest.crud.repository.interface";

@Injectable()
export default class MembershipRequestCrudRepositoryImpl extends BaseCrudRepository<MembershipRequest> implements MembershipRequestCrudRepositoryInterface {

    constructor(@InjectRepository(MembershipRequest) readonly repository: Repository<MembershipRequest>) {
        super(repository)
    }

    async existsByUserAndInstitution(userId: number, institutionId: number): Promise<boolean> {
        const count = await this.repository.count({
            where: {
                user: { id: userId },
                institution: { id: institutionId },
            },
        });
        return count > 0;
    }

}