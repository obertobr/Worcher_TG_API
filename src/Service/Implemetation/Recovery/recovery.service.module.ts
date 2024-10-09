import { Module } from "@nestjs/common";
import RecoveryRepositoryModule from "src/Repository/Implematation/Recovery/recovery.crud.repository.impl";
import RecoveryCrudServiceInterface from "src/Service/Interface/Recovery/recovery.crud.service.interface";
import RecoveryCrudRepositoryImpl from "src/Repository/Implematation/Recovery/recovery.crud.repository.impl";

@Module({
    imports: [RecoveryRepositoryModule],
    providers: [
          {
            provide: RecoveryCrudServiceInterface,
            useClass: RecoveryCrudRepositoryImpl,
          }
    ],
    exports: [RecoveryCrudServiceInterface]
})
export class RecoveryServiceModule{}