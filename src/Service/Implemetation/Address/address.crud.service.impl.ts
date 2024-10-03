import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import AddressCrudServiceInterface from "src/Service/Interface/Address/address.crud.service.interface";
import Address from "src/Model/Address/address.entity";
import AddressCrudRepositoryInterface from "src/Repository/Interface/Address/address.crud.repository.interface";

@Injectable()
export default class AddressCrudServiceImpl extends BaseCrudService<Address> implements AddressCrudServiceInterface {
    
    constructor(@Inject(AddressCrudRepositoryInterface) repository: AddressCrudRepositoryInterface) {
        super(repository);
    }

    async validate(entity: Address): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()
        if(entity.neighborhood == null){
            errorBuilder.addErrorMessage("Neighborhood Name is required")
        }

        if(entity.city == null){
            errorBuilder.addErrorMessage("city Name is required")
        }

        if(entity.number == null){
            errorBuilder.addErrorMessage("number city Name is required")
        }

        if(entity.street == null){
            errorBuilder.addErrorMessage("street Name is required")
        }

        return errorBuilder;
    }
}