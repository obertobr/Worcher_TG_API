import ErrorBuilder from "src/Service/Validation/error.builder";
import AbstractCrudServiceInterface from "../abstract.crud.service.interface";
import DigitalFile from "src/Model/DigitalFile/digitalFile.entity";
import { MemoryStoredFile } from "nestjs-form-data";

export default abstract class DigitalFileCrudServiceInterface {
    abstract validate(entity: MemoryStoredFile): Promise<ErrorBuilder>
   
   abstract save(entity: MemoryStoredFile): Promise<DigitalFile>

   abstract saveAll(entitys: MemoryStoredFile[]): Promise<DigitalFile[]>

   abstract update(entity: MemoryStoredFile): Promise<DigitalFile>;

   abstract getById(id: number, relations? : string[]): Promise<DigitalFile>

   abstract list(offset?: number, maxResult?: number): Promise<DigitalFile[]>

   abstract delete(id: number): Promise<void>

   abstract count(): Promise<number>
}