import AbstractCrudRepositoryInterface from "../abstract.crud.repository.interface";
import Institution from "src/Model/Institution/institution.entity";

export default abstract class InstitutionCrudRepositoryInterface extends AbstractCrudRepositoryInterface<Institution> {

    abstract getInstitutionByCode(code: number): Promise<Institution>

    abstract getInstitutionsByUserId(userId: number): Promise<Institution[]>

    abstract deleteAfterInstitution(institutionId: number): Promise<void>
}