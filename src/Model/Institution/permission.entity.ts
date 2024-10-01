import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Role from "./role.entity";
@Entity()
export default class Permission extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name', nullable: false})
  name: string;

  @ManyToMany(() => Role, role => role.permission)
  roleList: Role[];
}