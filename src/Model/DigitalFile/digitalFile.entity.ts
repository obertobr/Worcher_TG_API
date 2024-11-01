import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
@Entity()
export default class DigitalFile extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'url', nullable: false})
  name: string;

}