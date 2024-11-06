import { forwardRef, Module } from "@nestjs/common";
import { InstitutionRepositoryModule } from "src/Repository/Implematation/Institution/institution.repository.module";
import RoleCrudServiceInterface from "src/Service/Interface/Institution/role.crud.service.interface";
import RoleCrudServiceImpl from "./role.crud.service.impl";
import PermissionCrudServiceInterface from "src/Service/Interface/Institution/permission.crud.service.interface";
import PermissionCrudServiceImpl from "./permission.crud.service.impl";
import InstitutionCrudServiceInterface from "src/Service/Interface/Institution/institution.crud.service.interface";
import InstitutionCrudServiceImpl from "./institution.crud.service.impl";
import MembershipRequestCrudServiceInterface from "src/Service/Interface/Institution/membershipRequest.crud.service.interface";
import MembershipRequestCrudServiceImpl from "./membershipRequest.crud.service.impl";
import { UserRepositoryModule } from "src/Repository/Implematation/User/user.repository.module";
import { UserServiceModule } from "../User/user.service.module";

@Module({
    imports: [InstitutionRepositoryModule, forwardRef(() => UserServiceModule)],
    providers: [
          {
            provide: InstitutionCrudServiceInterface,
            useClass: InstitutionCrudServiceImpl,
          }, {
            provide: RoleCrudServiceInterface,
            useClass: RoleCrudServiceImpl,
          }, {
            provide: PermissionCrudServiceInterface,
            useClass: PermissionCrudServiceImpl,
          }, {
            provide: MembershipRequestCrudServiceInterface,
            useClass: MembershipRequestCrudServiceImpl,
          }
    ],
    exports: [InstitutionCrudServiceInterface, RoleCrudServiceInterface, PermissionCrudServiceInterface, MembershipRequestCrudServiceInterface]
})
export class InstitutionServiceModule{}