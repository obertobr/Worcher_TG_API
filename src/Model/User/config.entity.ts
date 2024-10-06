import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import User from "./user.entity";

@Entity()
export default class Config extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'recieveEmails', default: false})
  recieveEmails: boolean;

  @Column({name: 'recieveNotifications', default: false})
  recieveNotifications: boolean;

  @OneToOne(() => User, user => user.config)
  user: User;
}