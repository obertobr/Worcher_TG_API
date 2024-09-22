import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import User from "./user.entity";
import Role from "../Institution/role.entity";

@Entity()
export default class Member extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @ManyToOne(() => User, user => user.memberList, {nullable: false})
  user: User;

  @ManyToOne(() => Role, role => role.memberList, {eager: true, nullable: false})
  role: Role;
}