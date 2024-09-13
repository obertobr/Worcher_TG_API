import OptionList from "../Utils/option.list"

export default abstract class AbstractCrudRepositoryInterface<T> {

   abstract save(entity: T | T[]): Promise<T | T[]>

   abstract update(id: number, partialEntity: Partial<T>): Promise<T>

   abstract getById(id: number): Promise<T>

   abstract list(optionList: OptionList): Promise<T[]>

   abstract listAll(): Promise<T[]>

   abstract delete(id: number): Promise<void>

   abstract count(): Promise<number>

}