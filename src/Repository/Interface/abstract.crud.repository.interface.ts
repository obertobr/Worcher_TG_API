export default interface AbstractCrudRepositoryInterface<Entity> {

    save(entity: Entity): Promise<Entity>

    save(entitys: Entity[]): Promise<Entity[]>

    findOneById(id: number): Promise<Entity>

    list(): Promise<Entity[]>

    remove(entity: Entity): Promise<Entity>

    count(): Promise<number>

}