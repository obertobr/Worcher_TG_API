import { Module } from "@nestjs/common";
import { DigitalFileRepositoryModule } from "src/Repository/Implematation/DigitalFile/digitalFile.repository.module";
import DigitalFileCrudServiceInterface from "src/Service/Interface/DigitalFile/digitalFile.crud.service.interface";
import DigitalFileCrudServiceImpl from "./digitalFile.crud.service.impl";

@Module({
    imports: [DigitalFileRepositoryModule],
    providers: [
          {
            provide: DigitalFileCrudServiceInterface,
            useClass: DigitalFileCrudServiceImpl,
          },
    ],
    exports: [DigitalFileCrudServiceInterface]
})
export class DigitalFileServiceModule{}