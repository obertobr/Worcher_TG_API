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
import MemberCrudRepositoryImpl from "./member.crud.repository.impl";
import MemberCrudRepositoryInterface from "src/Repository/Interface/User/member.crud.repository.interface";
import Member from "src/Model/User/member.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, Config, Account, Member])],
    providers: [
          {
            provide: UserCrudRepositoryInterface,
            useClass: UserCrudRepositoryImpl,
          }, {
            provide: ConfigCrudRepositoryInterface,
            useClass: ConfigCrudRepositoryImpl,
          }, {
            provide: AccountCrudRepositoryInterface,
            useClass: AccountCrudRepositoryImpl,
          }, {
            provide: MemberCrudRepositoryInterface,
            useClass: MemberCrudRepositoryImpl,
          }
    ],
    exports: [ConfigCrudRepositoryInterface, UserCrudRepositoryInterface, AccountCrudRepositoryInterface, MemberCrudRepositoryInterface]
})
export class UserRepositoryModule{}