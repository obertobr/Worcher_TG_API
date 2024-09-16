import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import User from "./user.entity";

@Entity()
export default class Config extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'reciveEmails', default: false})
  reciveEmails: boolean;

  @Column({name: 'reciveNotifications', default: false})
  reciveNotifications: boolean;

  @OneToOne(() => User, user => user.config)
  user: User;
}