import ErrorBuilder from "src/Service/Validation/error.builder";
import AbstractCrudServiceInterface from "../abstract.crud.service.interface";
import User from "src/Model/User/user.entity";

export default abstract class UserCrudServiceInterface extends AbstractCrudServiceInterface<User> {


    abstract recoveryPassword(email:string): Promise<{accountId:number}>
    
}