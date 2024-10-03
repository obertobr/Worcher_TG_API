import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import State from "src/Model/Address/state.entity";
import StateCrudRepositoryImpl from "./state.crud.repository.impl";
import StateCrudRepositoryInterface from "src/Repository/Interface/Address/state.crud.repository.interface";
import City from "src/Model/Address/city.entity";
import CityCrudRepositoryInterface from "src/Repository/Interface/Address/city.crud.repository.interface";
import CityCrudRepositoryImpl from "./city.crud.repository.impl";

@Module({
    imports: [TypeOrmModule.forFeature([State,City])],
    providers: [
          {
            provide: StateCrudRepositoryInterface,
            useClass: StateCrudRepositoryImpl,
          },
          {
            provide: CityCrudRepositoryInterface,
            useClass: CityCrudRepositoryImpl,
          }
    ],
    exports: [StateCrudRepositoryInterface,CityCrudRepositoryInterface]
})
export class AddressRepositoryModule{}