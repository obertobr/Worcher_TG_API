import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Member from "../User/member.entity";

@Entity()
export default class Event extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name'})
  name: string;

  @Column({name: 'description'})
  description: string;

  @Column({name: 'creationDateTime'})
  creationDateTime: Date;

  @Column({name: 'dateTimeOfExecution'})
  dateTimeOfExecution: Date;

  @ManyToOne(() => Member, member => member.createdEventList, {nullable: false})
  member: Member;
 
  @ManyToMany(() => Member, member => member.particepatedEventList, { cascade: true })
  @JoinTable()
  registeredMemberList: Member[];

}