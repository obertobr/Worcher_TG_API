import { Module } from "@nestjs/common";
import ConfigCrudServiceImpl from "./config.crud.service.impl";
import ConfigCrudServiceInterface from "src/Service/Interface/User/config.crud.service.interface";
import { UserRepositoryModule } from "src/Repository/Implematation/User/user.repository.module";
import UserCrudServiceImpl from "./user.crud.service.impl";
import AccountCrudServiceInterface from "src/Service/Interface/User/account.crud.service.interface";
import AccountCrudServiceImpl from "./account.crud.service.impl";
import UserCrudServiceInterface from "src/Service/Interface/User/user.crud.service.interface";
import MemberCrudServiceImpl from "./member.crud.service.impl";
import MemberCrudServiceInterface from "src/Service/Interface/User/member.crud.service.interface";
import { InstitutionRepositoryModule } from "src/Repository/Implematation/Institution/institution.repository.module";

@Module({
    imports: [UserRepositoryModule, InstitutionRepositoryModule],
    providers: [
          {
            provide: UserCrudServiceInterface,
            useClass: UserCrudServiceImpl,
          }, {
            provide: ConfigCrudServiceInterface,
            useClass: ConfigCrudServiceImpl,
          }, {
            provide: AccountCrudServiceInterface,
            useClass: AccountCrudServiceImpl,
          }, {
            provide: MemberCrudServiceInterface,
            useClass: MemberCrudServiceImpl,
          }
    ],
    exports: [ConfigCrudServiceInterface, UserCrudServiceInterface, AccountCrudServiceInterface, MemberCrudServiceInterface]
})
export class UserServiceModule{}