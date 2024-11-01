import { Module } from "@nestjs/common";
import { InstitutionRepositoryModule } from "src/Repository/Implematation/Institution/institution.repository.module";
import RoleCrudServiceInterface from "src/Service/Interface/Institution/role.crud.service.interface";
import RoleCrudServiceImpl from "./role.crud.service.impl";
import PermissionCrudServiceInterface from "src/Service/Interface/Institution/permission.crud.service.interface";
import PermissionCrudServiceImpl from "./permission.crud.service.impl";
import InstitutionCrudServiceInterface from "src/Service/Interface/Institution/institution.crud.service.interface";
import InstitutionCrudServiceImpl from "./institution.crud.service.impl";
import DigitalFileCrudServiceImpl from "../DigitalFile/digitalFile.crud.service.impl";
import DigitalFileCrudServiceInterface from "src/Service/Interface/DigitalFile/digitalFile.crud.service.interface";

@Module({
    imports: [InstitutionRepositoryModule],
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
          }
    ],
    exports: [InstitutionCrudServiceInterface, RoleCrudServiceInterface, PermissionCrudServiceInterface]
})
export class InstitutionServiceModule{}