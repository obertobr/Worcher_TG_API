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

    protected beforeSave(entity: MemoryStoredFile): void {}

    async validate(entity: MemoryStoredFile): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()


        return errorBuilder;
    }


    protected afterSave(entity: DigitalFile): void { }

    protected beforeUpdate(entity: MemoryStoredFile): void {}

    protected afterUpdate(entity: MemoryStoredFile): void {}

    protected beforeRemove(entity: MemoryStoredFile): void { }

    protected afterRemove(entity: MemoryStoredFile): void { }

    protected async beforeInsert(entity: MemoryStoredFile): Promise<void> { }

    private createDigitalFile(url: string): DigitalFile {
        const entity = new DigitalFile();
        entity.url = url;

        return entity;
    }

    async save(file: MemoryStoredFile): Promise<DigitalFile> {
        this.beforeSave(file)
        const errorBuilder = await this.validate(file);
        if (!errorBuilder.hasErrors()) {
            await this.beforeInsert(file)

            const fileName = await this.saveFile(file)

            const savedEntity: DigitalFile = await this.repository.save(this.createDigitalFile(fileName)).then()
            this.afterSave(savedEntity)
            return savedEntity
        } else {
            errorBuilder.toThrowErrors()
        }
    }

    async saveAll(files: MemoryStoredFile[]): Promise<DigitalFile[]> {
        let savedEntities: DigitalFile[] = [];
        files.forEach(async file => {
            this.beforeSave(file)
            const errorBuilder = await this.validate(file)
            if (errorBuilder.hasErrors()) {
                errorBuilder.toThrowErrors()
            }

            const fileName = await this.saveFile(file)

            savedEntities.push(await this.repository.save(this.createDigitalFile(fileName)).then())

            await this.beforeInsert(file)
        })
        savedEntities.forEach(entity => this.afterSave(entity))
        return savedEntities
    }

    async delete(id: number): Promise<void> {
    
        const entity = await this.repository.getById(id)
        
        if (!entity) {
            throw new ValidationExcpection([`Entidade com o ID: ${id} não encontrada ou já deletada`],'Erro deletando objeto');
        }

        this.deleteFile(entity.url);
        
        await this.repository.delete(id);
    }

    async getById(id: number, relations? : string[]): Promise<DigitalFile> {
        const entity = await this.repository.getById(id)
        if (entity == null) {
            throw new ValidationExcpection([`Entidade com o ID: ${id} não encotrado`],'Erro deletando objeto');
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

    private async saveFile(file: MemoryStoredFile): Promise<string> {
        const extension = path.extname(file.originalName);
        const randomName = `${uuidv4()}${extension}`;
        const filePath = path.join(this.uploadPath, randomName);
    
        try {
          await fs.writeFile(filePath, file.buffer);
          return randomName; // Retorna o caminho do arquivo salvo
        } catch (err) {
          throw new Error('Erro ao salvar o arquivo: ' + err.message);
        }
      }

    private async deleteFile(fileName:string): Promise<void> {
        const filePath = path.join(this.uploadPath, fileName);

        try {
            await fs.unlink(filePath);
        } catch (err) {
            throw new Error('Erro ao remover o arquivo: ' + err.message);
        }
    }
}