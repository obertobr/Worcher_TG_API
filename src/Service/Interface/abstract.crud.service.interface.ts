import ErrorBuilder from "../Validation/error.builder";

export default abstract class AbstractCrudServiceInterface<T> {

   abstract validate(entity: T): Promise<ErrorBuilder>
   
   abstract save(entity: T): Promise<T>

   abstract saveAll(entitys: T[]): Promise<T[]>

   abstract update(entity: T): Promise<T>;

   abstract getById(id: number, relations? : string[]): Promise<T>

   abstract list(offset?: number, maxResult?: number): Promise<T[]>

   abstract delete(id: number): Promise<void>

   abstract count(): Promise<number>
}