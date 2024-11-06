import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import City from "./city.entity";
import Institution from "../Institution/institution.entity";
import Event from "../Event/event.entity";
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

  @ManyToOne(() => City, city => city.addressList, { cascade: true, eager:true})
  city: City;

  @OneToOne(() => Institution, institution => institution.address)
  institution: Institution;

  @OneToOne(() => Event, event => event.address)
  event: Event;
}