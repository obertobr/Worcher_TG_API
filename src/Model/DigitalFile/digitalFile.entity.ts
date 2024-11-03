import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Institution from "../Institution/institution.entity";
@Entity()
export default class DigitalFile extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'url', nullable: false})
  url: string;

  @OneToOne(() => Institution, institution => institution.image)
  institution: Institution;
}