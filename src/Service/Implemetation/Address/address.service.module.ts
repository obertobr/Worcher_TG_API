import { Module } from "@nestjs/common";
import { AddressRepositoryModule } from "src/Repository/Implematation/Address/address.repository.module";
import stateCrudServiceInterface from "src/Service/Interface/Address/state.crud.service.interface";
import stateCrudServiceImpl from "./state.crud.service.impl";
import StateCrudServiceInterface from "src/Service/Interface/Address/state.crud.service.interface";

@Module({
    imports: [AddressRepositoryModule],
    providers: [
          {
            provide: stateCrudServiceInterface,
            useClass: stateCrudServiceImpl,
          }
    ],
    exports: [StateCrudServiceInterface]
})
export class AddressServiceModule{}