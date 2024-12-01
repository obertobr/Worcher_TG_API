import BaseCrudRepository from "../base.crud.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "src/Model/User/user.entity";
import UserCrudRepositoryInterface from "src/Repository/Interface/User/user.crud.repository.interface";
import Account from "src/Model/User/account.entity";
import Config from "src/Model/User/config.entity";
import Member from "src/Model/User/member.entity";
import Event from "src/Model/Event/event.entity";

@Injectable()
export default class UserCrudRepositoryImpl extends BaseCrudRepository<User> implements UserCrudRepositoryInterface {
    
    constructor(@InjectRepository(User) readonly repository: Repository<User>){
        super(repository)
    }
    async findByCpf(cpf:string){
        return this.repository.createQueryBuilder('user')
        .where('user.cpf = :cpf', { cpf })
        .getOne();
    } 

    async deleteBeforeUser(userId: number): Promise<void> {
        // Obter IDs de membros associados ao userId
        console.log("USER ID: " + userId)

        const memberIds = (await this.repository
            .createQueryBuilder()
            .select('DISTINCT  member.id')
            .from(Member, 'member')
            .where('member.userId = :userId', { userId })
            .getRawMany())
            .map(member => { 
                console.log(member)
                return member['id']
            });
    
        // Obter IDs de eventos relacionados aos membros
        // const eventIds = (await this.repository
        //     .createQueryBuilder()
        //     .select('DISTINCT event.id')
        //     .from(Event, 'event')
        //     .innerJoin('event.registeredMemberList', 'member')
        //     .where('member.id IN (:...memberIds)', { memberIds })
        //     .getRawMany()).map(event => event['id']);

            console.log(memberIds)
            // console.log(eventIds)
    
        // Remover relação ManyToMany entre eventos e membros
        // if (eventIds.length && memberIds.length) {
        //     await this.repository
        //         .createQueryBuilder()
        //         .relation(Event, 'registeredMemberList')
        //         .of(eventIds) // IDs dos eventos
        //         .remove(memberIds); // IDs dos membros
        // }
    
        // Excluir eventos criados pelos membros associados ao userId
        // await this.repository
        //     .createQueryBuilder()
        //     .delete()
        //     .from(Event)
        //     .where('member.id IN (:...memberIds)', { memberIds })
        //     .execute();
    
        // Excluir membros associados ao userId

        const query = ` DELETE FROM member WHERE userId = ${userId} `
        console.log(query)
        // await this.repository.query(query);

        const queryRemoveAccount = `DELETE FROM account WHERE account.id in (SELECT accountId from user where user.id = ${userId} )`
        console.log(queryRemoveAccount)
        // await this.repository.query(queryRemoveAccount)

        // const queryRemoveConfig = `DELETE FROM config WHERE id in (SELECT configId from user where user.id = ${userId} )`
        // await this.repository.query(queryRemoveConfig)
        
    }
    
    
    
    
    

}