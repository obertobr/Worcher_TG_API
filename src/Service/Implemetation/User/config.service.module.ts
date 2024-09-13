
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import Config from "src/Model/User/config.entity";
import ConfigCrudServiceImpl from "./config.crud.service.impl";
import ConfigCrudServiceInterface from "src/Service/Interface/User/config.crud.service.interface";
import ConfigCrudRepositoryInterface from "src/Repository/Interface/User/config.crud.repository.interface";
import ConfigCrudRepositoryImpl from "src/Repository/Implematation/User/config.crud.repository.impl";
import { ConfigRepositoryModule } from "src/Repository/Implematation/User/config.repository.module";

@Module({
    imports: [TypeOrmModule.forFeature([Config]), ConfigRepositoryModule],
    providers: [
          {
            provide: ConfigCrudServiceInterface,
            useClass: ConfigCrudServiceImpl,
          }
    ],
    exports: [ConfigCrudServiceInterface]
})
export class ConfigServiceModule{}