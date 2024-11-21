
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Institution from "../Institution/institution.entity";
import Event from "./event.entity";

@Entity()
export default class EventCategory extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name'})
  name: string;

  @ManyToOne(() => Institution, institution => institution.eventCategoryList, {nullable: false})
  institution: Institution;

  @OneToMany(() => Event, event => event.eventCategory, {eager:true, cascade: true})
  eventList: Event[];


}