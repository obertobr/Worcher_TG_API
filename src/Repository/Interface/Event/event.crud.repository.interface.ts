import Event from "src/Model/Event/event.entity";
import AbstractCrudRepositoryInterface from "../abstract.crud.repository.interface";

export default abstract class EventCrudRepositoryInterface extends AbstractCrudRepositoryInterface<Event> {

    abstract getEventsByInstitutionAndCategory(institutionId: number,idCategory?: number | null, removeEventsWithDateBeforeDateNow?: boolean): Promise<Event[]>

    abstract getEventWithRegisteredMemberList(eventId: number): Promise<Event>;

    abstract getEventsByUser(userId: number): Promise<Event[]>

}