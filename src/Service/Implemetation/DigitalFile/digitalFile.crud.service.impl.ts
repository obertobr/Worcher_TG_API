import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import DigitalFile from "src/Model/DigitalFile/digitalFile.entity";
import DigitalFileCrudRepositoryInterface from "src/Repository/Interface/DigitalFile/digitalFile.crud.repository.interface";
import DigitalFileCrudServiceInterface from "src/Service/Interface/DigitalFile/digitalFile.crud.service.interface";
import { MemoryStoredFile } from "nestjs-form-data";
import OptionList from "src/Repository/Utils/option.list";
import ValidationExcpection from "src/Service/Validation/validation.exception";
import * as path from 'path';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class DigitalFileCrudServiceImpl implements DigitalFileCrudServiceInterface {
    
    private readonly uploadPath = path.join(process.cwd(), 'uploads')

    protected repository: DigitalFileCrudRepositoryInterface;

    constructor(@Inject(DigitalFileCrudRepositoryInterface) repository: DigitalFileCrudRepositoryInterface) {
        this.repository = repository;
    }

    protected beforeSave(entity: MemoryStoredFile): void {
        console.log(entity)
    }

    async validate(entity: MemoryStoredFile): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()


        return errorBuilder;
    }


    protected afterSave(entity: MemoryStoredFile): void { }

    protected beforeUpdate(entity: MemoryStoredFile): void {}

    protected afterUpdate(entity: MemoryStoredFile): void {}

    protected beforeRemove(entity: MemoryStoredFile): void { }

    protected afterRemove(entity: MemoryStoredFile): void { }

    protected async beforeInsert(entity: MemoryStoredFile): Promise<void> { }


    async save(entity: MemoryStoredFile): Promise<DigitalFile> {
        this.beforeSave(entity)

        console.log(await this.saveFile(entity))

        const a: DigitalFile = {id: 2, name: "as"}
        return a

        // const errorBuilder = await this.validate(entity);
        // if (!errorBuilder.hasErrors()) {
        //     await this.beforeInsert(entity)

        //     const savedEntity: DigitalFile = await this.repository.save(entity).then()
        //     this.afterSave(savedEntity)
        //     return savedEntity
        // } else {
        //     errorBuilder.toThrowErrors()
        // }
    }

    async saveAll(entities: MemoryStoredFile[]): Promise<DigitalFile[]> {
        // entities.forEach(async entity => {
        //     this.beforeSave(entity)
        //     const errorBuilder = await this.validate(entity)
        //     if (errorBuilder.hasErrors()) {
        //         errorBuilder.toThrowErrors()
        //     }

        //     await this.beforeInsert(entity)
        // })
        
        // const savedEntities: DigitalFile[] = await this.repository.save(entities).then()
        // savedEntities.forEach(entity => this.afterSave(entity))
        // return savedEntities
        const a: DigitalFile[] = [{id: 2, name: "as"}]
        return a
    }

    async update(entity: MemoryStoredFile): Promise<DigitalFile> {
        // this.beforeUpdate(entity);
        // await this.beforeInsert(entity)

        // const entityUpdated = await this.repository.update(entity['id'], entity);
        
        // if (!entityUpdated) {
        //     throw new ValidationExcpection([`Entity with ID ${entity['id']} not found`],'Erro ao atualizar objeto');
        // }
        
        // this.afterUpdate(entityUpdated);
        
        // return entity;
        const a: DigitalFile = {id: 2, name: "as"}
        return a
    }

    async delete(id: number): Promise<void> {
    
        const entity = await this.repository.getById(id)
        
        if (!entity) {
            throw new ValidationExcpection([`Entity with ID ${id} not found or already deleted`],'Error deleting object');
        }
        
        await this.repository.delete(id);
    }

    async getById(id: number, relations? : string[]): Promise<DigitalFile> {
        const entity = await this.repository.getById(id)
        if (entity == null) {
            throw new ValidationExcpection([`Entity with ID ${id} not found`],'Error getting object');
        }
        return this.repository.getById(id, relations)
    }

    list(offset?: number, maxResult?: number): Promise<DigitalFile[]> {
        if (offset && maxResult) {
            return this.repository.list(new OptionList(offset, maxResult))
        }
        return this.repository.listAll()
    }

    count(): Promise<number> {
        return this.repository.count()
    }

    async saveFile(file: MemoryStoredFile): Promise<string> {
        const extension = path.extname(file.originalName);
        const randomName = `${uuidv4()}${extension}`;
        const filePath = path.join(this.uploadPath, randomName);
    
        try {
          await fs.writeFile(filePath, file.buffer);
          return filePath; // Retorna o caminho do arquivo salvo
        } catch (err) {
          throw new Error('Erro ao salvar o arquivo: ' + err.message);
        }
      }
}