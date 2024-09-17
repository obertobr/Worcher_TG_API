import { Module } from "@nestjs/common";
import ConfigCrudServiceImpl from "./config.crud.service.impl";
import ConfigCrudServiceInterface from "src/Service/Interface/User/config.crud.service.interface";
import { UserRepositoryModule } from "src/Repository/Implematation/User/user.repository.module";
import UserCrudServiceImpl from "./user.crud.service.impl";
import AccountCrudServiceInterface from "src/Service/Interface/User/account.crud.service.interface";
import AccountCrudServiceImpl from "./account.crud.service.impl";
import UserCrudServiceInterface from "src/Service/Interface/User/user.crud.service.interface";
import { TypeOrmModule } from "@nestjs/typeorm";
import Config from "src/Model/User/config.entity";
import User from "src/Model/User/user.entity";
import Account from "src/Model/User/account.entity";

@Module({
    imports: [UserRepositoryModule],
    providers: [
          {
            provide: ConfigCrudServiceInterface,
            useClass: ConfigCrudServiceImpl,
          }, {
            provide: UserCrudServiceInterface,
            useClass: UserCrudServiceImpl,
          }, {
            provide: AccountCrudServiceInterface,
            useClass: AccountCrudServiceImpl,
          }
    ],
    exports: [ConfigCrudServiceInterface, UserCrudServiceInterface, AccountCrudServiceInterface]
})
export class UserServiceModule{}