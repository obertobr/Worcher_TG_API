
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Config from "src/Model/User/config.entity";
import ConfigCrudRepositoryInterface from "src/Repository/Interface/User/config.crud.repository.interface";
import ConfigCrudRepositoryImpl from "src/Repository/Implematation/User/config.crud.repository.impl";

@Module({
    imports: [TypeOrmModule.forFeature([Config])],
    providers: [
          {
            provide: ConfigCrudRepositoryInterface,
            useClass: ConfigCrudRepositoryImpl,
          }
    ],
    exports: [ConfigCrudRepositoryInterface]
})
export class ConfigRepositoryModule{}