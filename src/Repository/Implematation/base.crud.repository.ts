import { Repository } from "typeorm";
import AbstractCrudRepositoryInterface from "../Interface/abstract.crud.repository.interface";
import OptionList from "../Utils/option.list";


export default abstract class BaseCrudRepository<Entity> extends Repository<Entity> implements AbstractCrudRepositoryInterface<Entity> {
    
    listAll(): Promise<Entity[]> {
        return this.find()
    }

    list(offset: number = null, maxResult: number = null){
        return this.find(new OptionList(offset,maxResult))
    }
    
}