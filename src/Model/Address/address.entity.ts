import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import City from "./city.entity";
@Entity()
export default class Address extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'neighborhood', nullable: false})
  neighborhood: string;

  @Column({name: 'street', nullable: false})
  street: string;

  @Column({name: 'number', nullable: false})
  number: string;

  @Column({name: 'cep', nullable: false})
  cep: string;

  @ManyToOne(() => City, city => city.addressList, { cascade: true, eager:false})
  city: City;


}