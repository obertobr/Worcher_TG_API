import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Role from "src/Model/Institution/role.entity";
import RoleCrudRepositoryInterface from "src/Repository/Interface/Institution/role.crud.repository.interface";
import RoleCrudRepositoryImpl from "./role.crud.repository.impl";
import PermissionCrudRepositoryInterface from "src/Repository/Interface/Institution/permission.crud.repository.interface";
import PermissionCrudRepositoryImpl from "./permission.crud.repository.impl";
import Permission from "src/Model/Institution/permission.entity";
import Institution from "src/Model/Institution/institution.entity";
import InstitutionCrudRepositoryInterface from "src/Repository/Interface/Institution/institution.crud.repository.interface";
import InstitutionCrudRepositoryImpl from "./institution.crud.repository.impl";

@Module({
  imports: [TypeOrmModule.forFeature([Institution, Role, Permission])],
  providers: [
    {
      provide: InstitutionCrudRepositoryInterface,
      useClass: InstitutionCrudRepositoryImpl,
    }, {
      provide: RoleCrudRepositoryInterface,
      useClass: RoleCrudRepositoryImpl,
    }, {
      provide: PermissionCrudRepositoryInterface,
      useClass: PermissionCrudRepositoryImpl,
    }
  ],
  exports: [InstitutionCrudRepositoryInterface, RoleCrudRepositoryInterface, PermissionCrudRepositoryInterface]
})
export class InstitutionRepositoryModule { }