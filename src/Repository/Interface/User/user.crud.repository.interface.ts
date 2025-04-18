import AbstractCrudRepositoryInterface from "../abstract.crud.repository.interface";
import User from "src/Model/User/user.entity";

export default abstract class UserCrudRepositoryInterface extends AbstractCrudRepositoryInterface<User> {

    abstract findByCpf(cpf:string):Promise<User>

    abstract deleteBeforeUser(userId: number): Promise<void>

    abstract deleteAfterUser(accountId: number, configId: number): Promise<void>

}