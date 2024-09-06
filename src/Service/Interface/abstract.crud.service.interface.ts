export default interface AbstractCrudServiceInterface<Entity> {

    save(entity: Entity): Promise<Entity>

    saveAll(entitys: Entity[]): Promise<Entity[]>

    findOneById(id: number): Promise<Entity>

    list(offset?: number, maxResult?: number): Promise<Entity[]>

    remove(entity: Entity): Promise<Entity>

    count(): Promise<number>
}