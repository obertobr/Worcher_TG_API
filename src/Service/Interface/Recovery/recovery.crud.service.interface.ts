
import Account from "src/Model/User/account.entity";
import AbstractCrudServiceInterface from "../abstract.crud.service.interface";
import Recovery from "src/Model/Recovery/recovery.entity";

export default abstract class RecoveryCrudServiceInterface extends AbstractCrudServiceInterface<Recovery> {
    
    abstract findRecoveryAccount(account:Account):Promise<Recovery>
    abstract removeExpiredRecoveryCodes():Promise<void>
}