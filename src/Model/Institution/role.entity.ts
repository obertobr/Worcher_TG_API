import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Member from "../User/member.entity";
import Permission from "./permission.entity";
import Institution from "./institution.entity";
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

  @ManyToOne(() => Institution, institution => institution.roleList, {nullable: false})
  institution: Institution; 
}