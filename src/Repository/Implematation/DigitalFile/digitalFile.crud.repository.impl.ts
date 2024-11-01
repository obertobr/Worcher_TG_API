import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import DigitalFile from "src/Model/DigitalFile/digitalFile.entity";
import DigitalFileCrudRepositoryInterface from "src/Repository/Interface/DigitalFile/digitalFile.crud.repository.interface";

@Injectable()
export default class DigitalFileCrudRepositoryImpl extends BaseCrudRepository<DigitalFile> implements DigitalFileCrudRepositoryInterface {
    
    constructor(@InjectRepository(DigitalFile) readonly repository: Repository<DigitalFile>){
        super(repository)
    }

}