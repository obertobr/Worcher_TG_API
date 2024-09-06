import AbstractCrudServiceInterface from "../Interface/abstract.crud.service.interface";
import AbstractCrudRepositoryInterface from 'src/Repository/Interface/abstract.crud.repository.interface';
import ErrorBuilder from '../Validation/error.builder';
import OptionList from 'src/Repository/Utils/option.list';

export default abstract class BaseCrudService<Entity> implements AbstractCrudServiceInterface<Entity>{
    
    private repository: AbstractCrudRepositoryInterface<Entity>;

    constructor(repository: AbstractCrudRepositoryInterface<Entity>){
        this.repository = repository;
    }

     protected beforeSave(entiy: Entity): void{
        
     }

    abstract validate(entity: Entity): ErrorBuilder

    doSave(entity: Entity): Promise<Entity>{
        return this.repository.save(entity)
    }

    protected afterSave(entiy: Entity): void{

    }

    save(entity: Entity): Promise<Entity>{
        this.beforeSave(entity)

        const errorBuilder = this.validate(entity)
        let promise;

        if(!errorBuilder.hasErrors()){
             promise = this.doSave(entity);
        }else{
            errorBuilder.toThrowErrors()
        }

        this.afterSave(entity);

        return promise;
    }

    // TODO - Repensar método, já que as entidades devem ser validadas antes de serem salvas
    saveAll(entitys: Entity[]): Promise<Entity[]>{
        return this.repository.save(entitys);
    }

    findOneById(id: number): Promise<Entity> {
       return this.repository.findOneById(id);
    }

    list(offset?: number, maxResult?: number): Promise<Entity[]> {
        if(offset && maxResult)
            return this.repository.list(new OptionList(offset,maxResult))

        return this.repository.listAll()
    }

    protected beforeRemove(entiy: Entity): void{

    }

    protected afterRemove(Entity: Entity): void{

    }

    doRemove(entity: Entity): Promise<Entity>{
        return this.repository.remove(entity)
    }

    remove(entity: Entity): Promise<Entity> {
        this.beforeRemove(entity)
        const promise = this.doSave(entity)
        this.afterRemove(entity)
        return promise
    }
    count(): Promise<number> {
        return this.repository.count()
    }
    
}