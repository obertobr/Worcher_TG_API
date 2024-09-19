import { Module } from "@nestjs/common";
import { EventRepositoryModule } from "src/Repository/Implematation/Event/event.repository.module";
import EventCategoryCrudServiceInterface from "src/Service/Interface/Event/event.category.crud.service.interface";
import EventCategoryCrudServiceImpl from "./event.category.service.impl";

@Module({
    imports: [EventRepositoryModule],
    providers: [
          {
            provide: EventCategoryCrudServiceInterface,
            useClass: EventCategoryCrudServiceImpl,
          }
    ],
    exports: [EventCategoryCrudServiceInterface]
})
export class EventServiceModule{}