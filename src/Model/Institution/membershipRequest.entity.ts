import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import User from "../User/user.entity";
import Institution from "./institution.entity";
@Entity()
export default class MembershipRequest extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @ManyToOne(() => User, user => user.membershipRequest, {eager: true})
  user: User;

  @ManyToOne(() => Institution, institution => institution.membershipRequest, {eager: true})
  institution: Institution;
}