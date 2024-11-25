import Config from "src/Model/User/config.entity";
import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";
import Role from "src/Model/Institution/role.entity";
import RoleCrudServiceInterface from "src/Service/Interface/Institution/role.crud.service.interface";
import RoleCrudRepositoryInterface from "src/Repository/Interface/Institution/role.crud.repository.interface";
import ValidationExcpection from "src/Service/Validation/validation.exception";

@Injectable()
export default class RoleCrudServiceImpl extends BaseCrudService<Role> implements RoleCrudServiceInterface {
    
    constructor(@Inject(RoleCrudRepositoryInterface) repository: RoleCrudRepositoryInterface) {
        super(repository);
    }

    async validate(entity: Role): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()

        if(entity.name == null){
            errorBuilder.addErrorMessage("não é possivel criar posições sem nome")
        }

        return errorBuilder;
    }

    async delete(id: number): Promise<void> {
    
        const entity = await this.repository.getById(id, ["memberList"])
        
        if (!entity) {
            throw new ValidationExcpection([`Entidade com o ID: ${id} não encontrada ou já deletada`],'Erro ao deletar cargo');
        }
        if(entity.memberList.length != 0){
            throw new ValidationExcpection([`Existem membros usando esse cargo`],'Erro ao deletar cargo');
        }
        
        await this.repository.delete(id);
    }
   

}