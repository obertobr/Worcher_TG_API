import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import State from "src/Model/Address/state.entity";
import StateCrudRepositoryImpl from "./state.crud.repository.impl";
import StateCrudRepositoryInterface from "src/Repository/Interface/Address/state.crud.repository.interface";

@Module({
    imports: [TypeOrmModule.forFeature([State])],
    providers: [
          {
            provide: StateCrudRepositoryInterface,
            useClass: StateCrudRepositoryImpl,
          }
    ],
    exports: [StateCrudRepositoryInterface]
})
export class AddressRepositoryModule{}