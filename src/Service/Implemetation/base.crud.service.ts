import AbstractCrudServiceInterface from "../Interface/abstract.crud.service.interface";
import AbstractCrudRepositoryInterface from 'src/Repository/Interface/abstract.crud.repository.interface';

export default abstract class BaseCrudService<Entity> implements AbstractCrudServiceInterface<Entity>{
    
    private repository: AbstractCrudRepositoryInterface<Entity>;

    constructor(repository: AbstractCrudRepositoryInterface<Entity>){
        this.repository = repository;
    }


    abstract beforeSave(entiy: Entity): void;

    abstract validate

    doSave(entity: Entity): Promise<Entity>{
        return this.repository.save(entity);
    }

    abstract afterSave(entiy: Entity): void;

    save(entity: Entity): Promise<Entity>{
        return null;
    }

    saveAll(entitys: Entity[]): Promise<Entity[]>{
        return null;
    }


    findOneById(id: number): Promise<Entity> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Entity[]> {
        throw new Error("Method not implemented.");
    }
    remove(entity: Entity): Promise<Entity> {
        throw new Error("Method not implemented.");
    }
    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    
}