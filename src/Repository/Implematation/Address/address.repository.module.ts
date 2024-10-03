import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import State from "src/Model/Address/state.entity";
import StateCrudRepositoryImpl from "./state.crud.repository.impl";
import StateCrudRepositoryInterface from "src/Repository/Interface/Address/state.crud.repository.interface";
import City from "src/Model/Address/city.entity";
import CityCrudRepositoryInterface from "src/Repository/Interface/Address/city.crud.repository.interface";
import CityCrudRepositoryImpl from "./city.crud.repository.impl";
import Address from "src/Model/Address/address.entity";
import AddressCrudRepositoryInterface from "src/Repository/Interface/Address/address.crud.repository.interface";
import AddressCrudRepositoryImpl from "./address.crud.repository.impl";

@Module({
    imports: [TypeOrmModule.forFeature([State,City,Address])],
    providers: [
          {
            provide: StateCrudRepositoryInterface,
            useClass: StateCrudRepositoryImpl,
          },
          {
            provide: CityCrudRepositoryInterface,
            useClass: CityCrudRepositoryImpl,
          },
          {
            provide: AddressCrudRepositoryInterface,
            useClass: AddressCrudRepositoryImpl,
          }
    ],
    exports: [StateCrudRepositoryInterface,CityCrudRepositoryInterface,AddressCrudRepositoryInterface]
})
export class AddressRepositoryModule{}