import OptionList from "../Utils/option.list"

export default interface AbstractCrudRepositoryInterface<Entity> {

    save(entity: Entity): Promise<Entity>

    save(entitys: Entity[]): Promise<Entity[]>

    findOneById(id: number): Promise<Entity>

    list(optionList: OptionList): Promise<Entity[]>

    listAll(): Promise<Entity[]>

    remove(entity: Entity): Promise<Entity>

    count(): Promise<number>

}