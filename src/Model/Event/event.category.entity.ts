import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";

@Entity()
export default class EventCategory extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name'})
  name: string;

  @Column({name: 'color'})
  color: string;

}