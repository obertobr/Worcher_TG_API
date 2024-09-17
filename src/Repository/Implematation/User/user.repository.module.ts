import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Config from "src/Model/User/config.entity";
import ConfigCrudRepositoryInterface from "src/Repository/Interface/User/config.crud.repository.interface";
import ConfigCrudRepositoryImpl from "src/Repository/Implematation/User/config.crud.repository.impl";
import Account from "src/Model/User/account.entity";
import User from "src/Model/User/user.entity";
import UserCrudRepositoryInterface from "src/Repository/Interface/User/user.crud.repository.interface";
import UserCrudRepositoryImpl from "./user.crud.repository.impl";
import AccountCrudRepositoryInterface from "src/Repository/Interface/User/account.crud.repository.interface";
import AccountCrudRepositoryImpl from "./account.crud.repository.impl";

@Module({
    imports: [TypeOrmModule.forFeature([Config, User, Account])],
    providers: [
          {
            provide: ConfigCrudRepositoryInterface,
            useClass: ConfigCrudRepositoryImpl,
          },{
            provide: UserCrudRepositoryInterface,
            useClass: UserCrudRepositoryImpl,
          },{
            provide: AccountCrudRepositoryInterface,
            useClass: AccountCrudRepositoryImpl,
          }
    ],
    exports: [ConfigCrudRepositoryInterface, UserCrudRepositoryInterface, AccountCrudRepositoryInterface]
})
export class UserRepositoryModule{}