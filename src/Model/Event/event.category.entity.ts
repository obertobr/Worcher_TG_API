import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Institution from "../Institution/institution.entity";

@Entity()
export default class EventCategory extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name'})
  name: string;

  @Column({name: 'color'})
  color: string;

  @ManyToOne(() => Institution, institution => institution.eventCategoryList, {nullable: false})
  institution: Institution;

}