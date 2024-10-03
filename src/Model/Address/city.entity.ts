import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import State from "./state.entity";
@Entity()
export default class City extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name', nullable: false})
  name: string;

  @ManyToOne(() => State, state => state.citiesList)
  state: State;

}