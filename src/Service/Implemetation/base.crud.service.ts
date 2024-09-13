import AbstractCrudServiceInterface from "../Interface/abstract.crud.service.interface";
import AbstractCrudRepositoryInterface from 'src/Repository/Interface/abstract.crud.repository.interface';
import ErrorBuilder from '../Validation/error.builder';
import OptionList from 'src/Repository/Utils/option.list';
import ValidationExcpection from "../Validation/validation.exception";

export default abstract class BaseCrudService<T> implements AbstractCrudServiceInterface<T> {
    
    private repository: AbstractCrudRepositoryInterface<T>;

    constructor(repository: AbstractCrudRepositoryInterface<T>) {
        this.repository = repository;
    }

    protected beforeSave(entity: T): void { }

    protected afterSave(entity: T): void { }

    protected beforeUpdate(entity: T): void {}

    protected afterUpdate(entity: T): void {}

    protected beforeRemove(entity: T): void { }

    protected afterRemove(entity: T): void { }

    abstract validate(entity: T): ErrorBuilder

    async save(entity: T): Promise<T> {
        this.beforeSave(entity)

        const errorBuilder = this.validate(entity)
        if (!errorBuilder.hasErrors()) {
            const savedEntity: T = await this.repository.save(entity).then()
            this.afterSave(savedEntity)
            return savedEntity
        } else {
            errorBuilder.toThrowErrors()
        }
    }

    async saveAll(entities: T[]): Promise<T[]> {
        entities.forEach(entity => {
            this.beforeSave(entity)
            const errorBuilder = this.validate(entity)
            if (errorBuilder.hasErrors()) {
                errorBuilder.toThrowErrors()
            }
        })
        
        const savedEntities: T[] = await this.repository.save(entities).then()
        savedEntities.forEach(entity => this.afterSave(entity))
        return savedEntities
    }

    async update(entity: T): Promise<T> {
        this.beforeUpdate(entity);
        const entityUpdated = await this.repository.update(entity['id'], entity);
        
        if (!entityUpdated) {
            throw new ValidationExcpection([`Entity with ID ${entity['id']} not found`],'Erro ao atualizar objeto');
        }
        
        this.afterUpdate(entityUpdated);
        
        return entity;
    }

    async delete(id: number): Promise<void> {
    
        const entity = await this.repository.getById(id)
        
        if (!entity) {
            throw new ValidationExcpection([`Entity with ID ${id} not found or already deleted`],'Erro ao deletar objeto');
        }
        
        await this.repository.delete(id);
    }

    getById(id: number): Promise<T> {
        return this.repository.getById(id)
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
