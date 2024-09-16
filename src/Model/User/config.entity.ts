import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";

@Entity()
export default class Config extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'reciveEmails', default: false})
  reciveEmails: boolean;

  @Column({name: 'reciveNotifications', default: false})
  reciveNotifications: boolean;
}