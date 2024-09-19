import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import EventCategoryCrudRepositoryInterface from "src/Repository/Interface/Event/event.category.crud.repository.interface";
import EventCategoryCrudRepositoryImpl from "./event.category.crud.repository.impl";
import EventCategory from "src/Model/Event/event.category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([EventCategory])],
    providers: [
          {
            provide: EventCategoryCrudRepositoryInterface,
            useClass: EventCategoryCrudRepositoryImpl,
          }
    ],
    exports: [EventCategoryCrudRepositoryInterface]
})
export class EventRepositoryModule{}