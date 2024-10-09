import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Recovery from "src/Model/Recovery/recovery.entity";
import RecoveryCrudRepositoryInterface from "src/Repository/Interface/Recovery/recovery.crud.repository.interface";
import RecoveryCrudRepositoryImpl from "./recovery.crud.repository.impl";

@Module({
    imports: [TypeOrmModule.forFeature([Recovery])],
    providers: [
          {
            provide: RecoveryCrudRepositoryInterface,
            useClass: RecoveryCrudRepositoryImpl,
          }
    ],
    exports: [RecoveryCrudRepositoryInterface]
})
export class RecoveryRepositoryModule{}