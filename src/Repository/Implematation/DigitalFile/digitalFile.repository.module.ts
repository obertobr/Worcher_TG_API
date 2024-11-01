import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import DigitalFile from "src/Model/DigitalFile/digitalFile.entity";
import DigitalFileCrudRepositoryInterface from "src/Repository/Interface/DigitalFile/digitalFile.crud.repository.interface";
import DigitalFileCrudRepositoryImpl from "./digitalFile.crud.repository.impl";

@Module({
    imports: [TypeOrmModule.forFeature([DigitalFile])],
    providers: [
          {
            provide: DigitalFileCrudRepositoryInterface,
            useClass: DigitalFileCrudRepositoryImpl,
          }
    ],
    exports: [DigitalFileCrudRepositoryInterface]
})
export class DigitalFileRepositoryModule{}