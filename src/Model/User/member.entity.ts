import { Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import User from "./user.entity";
import Role from "../Institution/role.entity";
import Event from "../Event/event.entity";
import Institution from "../Institution/institution.entity";

@Entity()
export default class Member extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @ManyToOne(() => User, user => user.memberList, {nullable: false})
  user: User;

  @ManyToOne(() => Role, role => role.memberList, {eager: true, nullable: false})
  role: Role;
  
  @OneToMany(() => Event, event => event.member, { cascade: true ,eager: true } )
  createdEventList: Event[];

  @ManyToMany(() => Event, event => event.registeredMemberList)
  particepatedEventList: Event[];

  @ManyToOne(() => Institution, institution => institution.memberList, {nullable: false})
  institution: Institution;

}