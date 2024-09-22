import { Repository } from "typeorm";
import AbstractCrudRepositoryInterface from "../Interface/abstract.crud.repository.interface";
import OptionList from "../Utils/option.list";
import BaseEntity from "src/Model/baseEntity";


export default abstract class BaseCrudRepository<T extends BaseEntity> implements AbstractCrudRepositoryInterface<T> {
    
    constructor(readonly repository: Repository<T>) {}

    save(entity: T | T[]): Promise<T | T[]> {
        if (Array.isArray(entity)) {
            return this.repository.save(entity)
        } else {
            return this.repository.save(entity)
        }
    }

    getById(id: number, relations? : string[]): Promise<T> {
        return this.repository.findOne({
            where: {id: id as any},
            relations: relations || []
        })
    }
        
    count(): Promise<number> {
        return this.repository.count()
    }

    listAll(): Promise<T[]> {
        return this.repository.find();
    }

    list(optionList: OptionList): Promise<T[]> {
        return this.repository.find(optionList);
    }

    update(id: number, partialEntity: Partial<T>): Promise<T> {
        return this.repository.findOneById(id).then(entity => {
            if (!entity) {
               return null
            }
            Object.assign(entity, partialEntity)
            return this.repository.save(entity)
        });
    }
    
    delete(id: number): Promise<void> {
        return this.repository.delete(id).then(() => {})
    }
    
}