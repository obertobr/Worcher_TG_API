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
import MemberCrudRepositoryInterface from "src/Repository/Interface/User/member.crud.repository.interface";

@Injectable()
export default class UserCrudRepositoryImpl extends BaseCrudRepository<User> implements UserCrudRepositoryInterface {
    
    private _repositoryMember: Repository<Member>;

    constructor(@InjectRepository(User) readonly repository: Repository<User>,
                @InjectRepository(Member) readonly repositoryMember: Repository<Member>,
    ){
        super(repository)
        this._repositoryMember = repositoryMember
    }
    async findByCpf(cpf:string){
        return this.repository.createQueryBuilder('user')
        .where('user.cpf = :cpf', { cpf })
        .getOne();
    } 

    async deleteMemberEvents(memberId: number): Promise<void> {
        await this._repositoryMember
            .createQueryBuilder()
            .delete()
            .from(Event)
            .where('member.id = :memberId', { memberId })
            .execute();
    

            console.log("Deletando event_registerd_member_list com ID do membro: " + memberId)
        const query = ` delete from event_registered_member_list_member where memberId = ${memberId} ` 
        await this.repository.query(query)

        // await this._repositoryMember
        //     .createQueryBuilder()
        //     .relation(Member, 'particepatedEventList')
        //     .of(memberId)
        //     .remove(await this.getParticipatedEvents(memberId));
    }
      
    private async getParticipatedEvents(memberId: number): Promise<Event[]> {
      const member = await this._repositoryMember.findOne({
          where: { id: memberId },
          relations: ['particepatedEventList'],
      });
  
      return member ? member.particepatedEventList : [];
  }

    async deleteBeforeUser(userId: number): Promise<void> {
        // Obter IDs de membros associados ao userId

        const memberIds = (await this.repository
            .createQueryBuilder()
            .select('DISTINCT  member.id')
            .from(Member, 'member')
            .where('member.userId = :userId', { userId })
            .getRawMany())
            .map(member => { 
                return member['id']
            });

        for(let i = 0; i < memberIds.length; i++){
            const memberId = memberIds[i]
            if(memberId != null && memberId != undefined){
                console.log(memberId)
                await this.deleteMemberEvents(memberId)
            }
        }

        console.log("Deletando member com id de USER: " + userId)
        const query = ` DELETE FROM member WHERE userId = ${userId} `
        await this.repository.query(query);

    }
    
    async deleteAfterUser(accountId: number, configId: number): Promise<void> {
        const queryRemoveAccount = `DELETE FROM account WHERE account.id = ${accountId} `
        await this.repository.query(queryRemoveAccount)

        const queryRemoveConfig = `DELETE FROM config WHERE id = ${configId} `
        await this.repository.query(queryRemoveConfig)
    }
    
    
    
    

}