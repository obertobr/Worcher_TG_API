import { Module } from "@nestjs/common";
import { InstitutionRepositoryModule } from "src/Repository/Implematation/Institution/institution.repository.module";
import RoleCrudServiceInterface from "src/Service/Interface/Institution/role.crud.service.interface";
import RoleCrudServiceImpl from "./role.crud.service.impl";
import PermissionCrudServiceInterface from "src/Service/Interface/Institution/permission.crud.service.interface";
import PermissionCrudServiceImpl from "./permission.crud.service.impl";

@Module({
    imports: [InstitutionRepositoryModule],
    providers: [
          {
            provide: RoleCrudServiceInterface,
            useClass: RoleCrudServiceImpl,
          }, {
            provide: PermissionCrudServiceInterface,
            useClass: PermissionCrudServiceImpl,
          }
    ],
    exports: [RoleCrudServiceInterface, PermissionCrudServiceInterface]
})
export class InstitutionServiceModule{}