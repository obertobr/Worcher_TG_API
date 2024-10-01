import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Member from "../User/member.entity";
import Permission from "./permission.entity";
@Entity()
export default class Role extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name', nullable: false})
  name: string;

  @OneToMany(() => Member, member => member.role)
  memberList: Member[];

  @ManyToMany(() => Permission, permission => permission.roleList, {eager: true})
  @JoinTable()
  permission: Permission[];
}