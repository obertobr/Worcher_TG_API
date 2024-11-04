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
import MembershipRequestCrudRepositoryInterface from "src/Repository/Interface/Institution/membershipRequest.crud.repository.interface";
import MembershipRequestCrudRepositoryImpl from "./membershipRequest.crud.repository.impl";
import MembershipRequest from "src/Model/Institution/membershipRequest.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Institution, Role, Permission, MembershipRequest])],
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
    }, {
      provide: MembershipRequestCrudRepositoryInterface,
      useClass: MembershipRequestCrudRepositoryImpl,
    }
  ],
  exports: [InstitutionCrudRepositoryInterface, RoleCrudRepositoryInterface, PermissionCrudRepositoryInterface, MembershipRequestCrudRepositoryInterface]
})
export class InstitutionRepositoryModule { }