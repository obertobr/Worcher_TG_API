import AbstractCrudRepositoryInterface from "../abstract.crud.repository.interface";
import User from "src/Model/User/user.entity";

export default abstract class UserCrudRepositoryInterface extends AbstractCrudRepositoryInterface<User> {

    abstract findByCpf(cpf:string):Promise<User>

}