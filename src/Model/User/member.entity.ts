import { Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import User from "./user.entity";
import Event from "../Event/event.entity";

@Entity()
export default class Member extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @ManyToOne(() => User, user => user.memberList, {nullable: false})
  user: User;

  @OneToMany(() => Event, event => event.member, { cascade: true ,eager: true } )
  createdEventList: Event[];

  @ManyToMany(() => Event, event => event.registeredMemberList)
  particepatedEventList: Event[];

}