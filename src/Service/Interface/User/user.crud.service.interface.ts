import AbstractCrudServiceInterface from "../abstract.crud.service.interface";
import User from "src/Model/User/user.entity";

export default abstract class UserCrudServiceInterface extends AbstractCrudServiceInterface<User> {


    abstract recoveryPassword(id:number): Promise<void>
    
}