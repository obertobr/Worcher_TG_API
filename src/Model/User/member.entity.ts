import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import User from "./user.entity";

@Entity()
export default class Member extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @ManyToOne(() => User, user => user.member, {nullable: false})
  user: User;
}