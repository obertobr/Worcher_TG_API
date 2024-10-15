import Address from "src/Model/Address/address.entity";
import AbstractCrudRepositoryInterface from "../abstract.crud.repository.interface";
import Recovery from "src/Model/Recovery/recovery.entity";
import Account from "src/Model/User/account.entity";
import { ScheduleModule } from '@nestjs/schedule'; // Importando ScheduleModule

export default abstract class RecoveryCrudRepositoryInterface extends AbstractCrudRepositoryInterface<Recovery> {

    abstract findRecoveryAccount(account:Account):Promise<Recovery>
    abstract findByDate(expiration_time:Date):Promise<Recovery[]>
}