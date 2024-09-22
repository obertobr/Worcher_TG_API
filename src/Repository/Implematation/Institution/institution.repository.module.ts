import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Role from "src/Model/Institution/role.entity";
import RoleCrudRepositoryInterface from "src/Repository/Interface/Institution/role.crud.repository.interface";
import RoleCrudRepositoryImpl from "./role.crud.repository.impl";

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [
          {
            provide: RoleCrudRepositoryInterface,
            useClass: RoleCrudRepositoryImpl,
          }
    ],
    exports: [RoleCrudRepositoryInterface]
})
export class InstitutionRepositoryModule{}