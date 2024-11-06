import { forwardRef, Module } from "@nestjs/common";
import ConfigCrudServiceImpl from "./config.crud.service.impl";
import ConfigCrudServiceInterface from "src/Service/Interface/User/config.crud.service.interface";
import { UserRepositoryModule } from "src/Repository/Implematation/User/user.repository.module";
import UserCrudServiceImpl from "./user.crud.service.impl";
import AccountCrudServiceInterface from "src/Service/Interface/User/account.crud.service.interface";
import AccountCrudServiceImpl from "./account.crud.service.impl";
import UserCrudServiceInterface from "src/Service/Interface/User/user.crud.service.interface";
import MemberCrudServiceImpl from "./member.crud.service.impl";
import MemberCrudServiceInterface from "src/Service/Interface/User/member.crud.service.interface";
import { InstitutionServiceModule } from "../Institution/institution.service.module";
import RecoveryCrudServiceInterface from "src/Service/Interface/Recovery/recovery.crud.service.interface";
import RecoveryCrudServiceImpl from "../Recovery/recovery.crud.service.impl";
import { RecoveryRepositoryModule } from "src/Repository/Implematation/Recovery/recovery.repository.module";


@Module({
    imports: [UserRepositoryModule,RecoveryRepositoryModule, forwardRef(() => InstitutionServiceModule)],
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
          , {
            provide: RecoveryCrudServiceInterface,
            useClass: RecoveryCrudServiceImpl,
          }
    ],
    exports: [ConfigCrudServiceInterface, UserCrudServiceInterface, AccountCrudServiceInterface, MemberCrudServiceInterface,RecoveryCrudServiceInterface]
})
export class UserServiceModule{}