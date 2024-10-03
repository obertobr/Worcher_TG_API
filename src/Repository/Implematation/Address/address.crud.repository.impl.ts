import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Address from "src/Model/Address/address.entity";
import AddressCrudRepositoryInterface from "src/Repository/Interface/Address/address.crud.repository.interface";

@Injectable()
export default class AddressCrudRepositoryImpl extends BaseCrudRepository<Address> implements AddressCrudRepositoryInterface {
    
    constructor(@InjectRepository(Address) readonly repository: Repository<Address>){
        super(repository)
    }

}