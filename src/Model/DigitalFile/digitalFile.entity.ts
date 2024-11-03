import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Institution from "../Institution/institution.entity";
import Event from "../Event/event.entity";
@Entity()
export default class DigitalFile extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'url', nullable: false})
  url: string;

  @OneToOne(() => Institution, institution => institution.image)
  institution: Institution;
  
  @OneToOne(() => Event, event => event.image)
  event: Event;
}