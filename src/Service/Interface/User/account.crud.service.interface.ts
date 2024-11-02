import AbstractCrudServiceInterface from "../abstract.crud.service.interface";
import Account from "src/Model/User/account.entity";

export default abstract class AccountCrudServiceInterface extends AbstractCrudServiceInterface<Account> {

    abstract findByEmail(email: string): Promise<Account>
    
}