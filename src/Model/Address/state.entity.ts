import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import City from "./city.entity";
@Entity()
export default class State extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name'})
  name: string;

  @Column({name: 'uf', nullable:true})
  uf: string;

  @OneToMany(() => City, city => city.state, { cascade: true })
  citiesList: City[];


}