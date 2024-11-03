import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Member from "../User/member.entity";
import Institution from "../Institution/institution.entity";
import DigitalFile from "../DigitalFile/digitalFile.entity";

@Entity()
export default class Event extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name'})
  name: string;

  @Column({name: 'description'})
  description: string;

  @Column({name: 'creationDateTime'})
  creationDateTime: Date;

  @Column({name: 'dateTimeOfExecution'})
  dateTimeOfExecution: Date;

  @ManyToOne(() => Member, member => member.createdEventList, {nullable: false})
  member: Member;
 
  @ManyToMany(() => Member, member => member.particepatedEventList, { cascade: true })
  @JoinTable()
  registeredMemberList: Member[];

  @ManyToOne(() => Institution, institution => institution.eventList, {nullable: false})
  institution: Institution;

  @OneToOne(() => DigitalFile, digitalFile => digitalFile.event, {eager:true})
  @JoinColumn()
  image: DigitalFile;
}