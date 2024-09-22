import { Module } from "@nestjs/common";
import { EventRepositoryModule } from "src/Repository/Implematation/Event/event.repository.module";
import EventCategoryCrudServiceInterface from "src/Service/Interface/Event/event.category.crud.service.interface";
import EventCategoryCrudServiceImpl from "./event.category.service.impl";
import EventCrudServiceImpl from "./event.crud.service.impl";
import EventCrudServiceInterface from "src/Service/Interface/Event/event.crud.service.interface";
import { UserServiceModule } from "../User/user.service.module";

@Module({
    imports: [EventRepositoryModule, UserServiceModule],
    providers: [
          {
            provide: EventCategoryCrudServiceInterface,
            useClass: EventCategoryCrudServiceImpl,
          },
          {
            provide: EventCrudServiceInterface,
            useClass: EventCrudServiceImpl,
          }
    ],
    exports: [EventCategoryCrudServiceInterface,EventCrudServiceInterface]
})
export class EventServiceModule{}