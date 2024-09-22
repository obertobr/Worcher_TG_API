import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import EventCategoryCrudRepositoryInterface from "src/Repository/Interface/Event/event.category.crud.repository.interface";
import EventCategoryCrudRepositoryImpl from "./event.category.crud.repository.impl";
import EventCategory from "src/Model/Event/event.category.entity";
import Event from "src/Model/Event/event.entity";
import EventCrudRepositoryInterface from "src/Repository/Interface/Event/event.crud.repository.interface";
import EventCrudRepositoryImpl from "./event.crud.repository.impl";

@Module({
    imports: [TypeOrmModule.forFeature([EventCategory,Event])],
    providers: [
          {
            provide: EventCategoryCrudRepositoryInterface,
            useClass: EventCategoryCrudRepositoryImpl,
          },
          {
            provide: EventCrudRepositoryInterface,
            useClass: EventCrudRepositoryImpl,
          }
    ],
    exports: [EventCategoryCrudRepositoryInterface,EventCrudRepositoryInterface]
})
export class EventRepositoryModule{}