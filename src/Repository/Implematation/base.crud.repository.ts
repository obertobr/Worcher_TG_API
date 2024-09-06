import { Repository } from "typeorm";
import AbstractCrudRepositoryInterface from "../Interface/abstract.crud.repository.interface";
import OptionList from "../Utils/option.list";


export default abstract class BaseCrudRepository<Entity> extends Repository<Entity> implements AbstractCrudRepositoryInterface<Entity> {
    
    listAll(): Promise<Entity[]> {
        return this.find()
    }

    list(optionList: OptionList){
        return this.find(optionList)
    }
    
}