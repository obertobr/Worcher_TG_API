import { promises } from "dns";
import AbstractCrudServiceInterface from "../abstract.crud.service.interface";
import User from "src/Model/User/user.entity";

export default abstract class UserCrudServiceInterface extends AbstractCrudServiceInterface<User> {


    abstract recoveryPassword(email:string): Promise<{accountId:number}>

    abstract recoveryCheck(id:number,code:number):Promise<void>

    abstract login(email: string, password: string): Promise<User>
    
    abstract findByCpf(cpf:string):Promise<User>

    abstract checkEmail(email:string): Promise<boolean>

}