import { Module } from "@nestjs/common";
import { AddressRepositoryModule } from "src/Repository/Implematation/Address/address.repository.module";
import stateCrudServiceInterface from "src/Service/Interface/Address/state.crud.service.interface";
import stateCrudServiceImpl from "./state.crud.service.impl";
import StateCrudServiceInterface from "src/Service/Interface/Address/state.crud.service.interface";
import CityCrudServiceInterface from "src/Service/Interface/Address/city.crud.service.interface";
import CityCrudServiceImpl from "./city.crud.service.impl";
import AddressCrudServiceInterface from "src/Service/Interface/Address/address.crud.service.interface";
import AddressCrudServiceImpl from "./address.crud.service.impl";

@Module({
    imports: [AddressRepositoryModule],
    providers: [
          {
            provide: stateCrudServiceInterface,
            useClass: stateCrudServiceImpl,
          },
          {
            provide: CityCrudServiceInterface,
            useClass: CityCrudServiceImpl,
          },
          {
            provide: AddressCrudServiceInterface,
            useClass: AddressCrudServiceImpl,
          }
    ],
    exports: [StateCrudServiceInterface,CityCrudServiceInterface,AddressCrudServiceInterface]
})
export class AddressServiceModule{}