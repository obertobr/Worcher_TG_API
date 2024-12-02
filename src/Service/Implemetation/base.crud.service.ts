import AbstractCrudServiceInterface from "../Interface/abstract.crud.service.interface";
import AbstractCrudRepositoryInterface from 'src/Repository/Interface/abstract.crud.repository.interface';
import ErrorBuilder from '../Validation/error.builder';
import OptionList from 'src/Repository/Utils/option.list';
import ValidationExcpection from "../Validation/validation.exception";

export default abstract class BaseCrudService<T> implements AbstractCrudServiceInterface<T> {
    
    protected repository: AbstractCrudRepositoryInterface<T>;

    constructor(repository: AbstractCrudRepositoryInterface<T>) {
        this.repository = repository;
    }

    protected beforeSave(entity: T): void { }

    protected afterSave(entity: T): void { }

    protected beforeUpdate(entity: T): void {}

    protected afterUpdate(entity: T): void {}

    protected beforeRemove(): void { }

    protected afterRemove(entity: T): void { }

    protected async beforeInsert(entity: T): Promise<void> { }


    

    abstract validate(entity: T): Promise<ErrorBuilder>

    async save(entity: T): Promise<T> {
        this.beforeSave(entity)

        const errorBuilder = await this.validate(entity);
        if (!errorBuilder.hasErrors()) {
            await this.beforeInsert(entity)

            const savedEntity: T = await this.repository.save(entity).then()
            this.afterSave(savedEntity)
            return savedEntity
        } else {
            errorBuilder.toThrowErrors()
        }
    }

    async saveAll(entities: T[]): Promise<T[]> {
        entities.forEach(async entity => {
            this.beforeSave(entity)
            const errorBuilder = await this.validate(entity)
            if (errorBuilder.hasErrors()) {
                errorBuilder.toThrowErrors()
            }

            await this.beforeInsert(entity)
        })
        
        const savedEntities: T[] = await this.repository.save(entities).then()
        savedEntities.forEach(entity => this.afterSave(entity))
        return savedEntities
    }

    async update(entity: T): Promise<T> {
        this.beforeUpdate(entity);

        const errorBuilder = await this.validate(entity)

        if (!errorBuilder.hasErrors()) {
            await this.beforeInsert(entity)

            const entityUpdated = await this.repository.update(entity['id'], entity);
        
            if (!entityUpdated) {
                throw new ValidationExcpection([`Entidade com o ID: ${entity['id']} não encontrada`],'Erro ao atualizar objeto');
            }
            
            this.afterUpdate(entityUpdated);
            
            return entity;
        }else{
            errorBuilder.toThrowErrors()
        }
    }

    async delete(id: number): Promise<void> {
        this.beforeRemove()
    
        const entity = await this.repository.getById(id)
        
        if (!entity) {
            throw new ValidationExcpection([`Entidade com o ID: ${id} não encontrada ou já deletada`],'Erro ao deletar objeto');
        }
        
        await this.repository.delete(id);
    }

    async getById(id: number, relations? : string[]): Promise<T> {
        const entity = await this.repository.getById(id)
        if (entity == null) {
            throw new ValidationExcpection([`Entidade com o ID: ${id} não encontrada`],'Erro para encontrar o objeto');
        }
        return this.repository.getById(id, relations)
    }

    list(offset?: number, maxResult?: number): Promise<T[]> {
        if (offset && maxResult) {
            return this.repository.list(new OptionList(offset, maxResult))
        }
        return this.repository.listAll()
    }

    count(): Promise<number> {
        return this.repository.count()
    }
}
