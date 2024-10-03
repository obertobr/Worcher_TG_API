import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import City from "src/Model/Address/city.entity";
import CityCrudServiceInterface from "src/Service/Interface/Address/city.crud.service.interface";
import CityCrudRepositoryInterface from "src/Repository/Interface/Address/city.crud.repository.interface";

@Injectable()
export default class CityCrudServiceImpl extends BaseCrudService<City> implements CityCrudServiceInterface {
    
    constructor(@Inject(CityCrudRepositoryInterface) repository: CityCrudRepositoryInterface) {
        super(repository);
    }

    async validate(entity: City): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()
        if(entity.name == null){
            errorBuilder.addErrorMessage("Name is required")
        }
        if(entity.state == null){
            errorBuilder.addErrorMessage("state Name is required")
        }

        return errorBuilder;
    }
}