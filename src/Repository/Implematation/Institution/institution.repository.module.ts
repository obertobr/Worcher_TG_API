import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Role from "src/Model/Institution/role.entity";
import RoleCrudRepositoryInterface from "src/Repository/Interface/Institution/role.crud.repository.interface";
import RoleCrudRepositoryImpl from "./role.crud.repository.impl";
import PermissionCrudRepositoryInterface from "src/Repository/Interface/Institution/permission.crud.repository.interface";
import PermissionCrudRepositoryImpl from "./permission.crud.repository.impl";
import Permission from "src/Model/Institution/permission.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Role, Permission])],
    providers: [
          {
            provide: RoleCrudRepositoryInterface,
            useClass: RoleCrudRepositoryImpl,
          },{
            provide: PermissionCrudRepositoryInterface,
            useClass: PermissionCrudRepositoryImpl,
          }
    ],
    exports: [RoleCrudRepositoryInterface, PermissionCrudRepositoryInterface]
})
export class InstitutionRepositoryModule{}