import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import State from "./state.entity";
import Address from "./address.entity";
@Entity()
export default class City extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name', nullable: false})
  name: string;

  @ManyToOne(() => State, state => state.citiesList)
  state: State;

  @OneToMany(() => Address, address => address.city)
  addressList: Address[];

}