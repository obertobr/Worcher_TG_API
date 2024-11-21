import Event from "src/Model/Event/event.entity";
import AbstractCrudServiceInterface from "../abstract.crud.service.interface";

export default abstract class EventCrudServiceInterface extends AbstractCrudServiceInterface<Event> {
    abstract getEventsByInstitutionAndCategory(institutionId: number,idCategory?: number | null): Promise<Event[]> 
}