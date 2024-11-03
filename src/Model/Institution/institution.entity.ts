import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Role from "./role.entity";
import Member from "../User/member.entity";
import Event from "../Event/event.entity";
import EventCategory from "../Event/event.category.entity";
import Address from "../Address/address.entity";
import DigitalFile from "../DigitalFile/digitalFile.entity";
@Entity()
export default class Institution extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'code', nullable: false})
  code: string;

  @Column({name: 'name', nullable: false})
  name: string;

  @Column({name: 'description', nullable: false})
  description: string;

  @OneToMany(() => Role, role => role.institution, {eager:true, cascade: true})
  roleList: Role[];

  @OneToMany(() => Member, member => member.institution, {eager:true, cascade: true})
  memberList: Member[];

  @OneToMany(() => Event, event => event.institution, {eager:true, cascade: true})
  eventList: Event[];

  @OneToMany(() => EventCategory, eventCategory => eventCategory.institution, {eager:true, cascade: true})
  eventCategoryList: EventCategory[];

  @OneToOne(() => Address, address => address.institution, {eager:true, cascade: true, nullable: false})
  @JoinColumn()
  address: Address;

  @OneToOne(() => DigitalFile, digitalFile => digitalFile.institution, {eager:true})
  @JoinColumn()
  image: DigitalFile;
}