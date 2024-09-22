import { Module } from "@nestjs/common";
import { InstitutionRepositoryModule } from "src/Repository/Implematation/Institution/institution.repository.module";
import RoleCrudServiceInterface from "src/Service/Interface/Institution/role.crud.service.interface";
import RoleCrudServiceImpl from "./role.crud.service.impl";

@Module({
    imports: [InstitutionRepositoryModule],
    providers: [
          {
            provide: RoleCrudServiceInterface,
            useClass: RoleCrudServiceImpl,
          }
    ],
    exports: [RoleCrudServiceInterface]
})
export class InstitutionServiceModule{}