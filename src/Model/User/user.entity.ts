import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import Config from "./config.entity";
import Account from "./account.entity";
import Member from "./member.entity";
import MembershipRequest from "../Institution/membershipRequest.entity";
import DigitalFile from "../DigitalFile/digitalFile.entity";

@Entity()
export default class User extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name'})
  name: string;

  @Column({name: 'cpf'})
  cpf: string;

  @Column({name: 'dateOfBirth'})
  dateOfBirth: Date;

  @OneToOne(() => Config, config => config.user, { cascade: true, eager: true })
  @JoinColumn()
  config: Config;

  @OneToOne(() => Account, account => account.user, { cascade: true, eager: true })
  @JoinColumn()
  account: Account;

  @OneToMany(() => Member, member => member.user, { cascade: true})
  @JoinColumn()
  memberList: Member[];

  @OneToMany(() => MembershipRequest, membershipRequest => membershipRequest.user, { cascade: true})
  membershipRequest: MembershipRequest[];

  @OneToOne(() => DigitalFile, digitalFile => digitalFile.institution, {eager:true, onDelete: 'SET NULL'})
  @JoinColumn()
  image: DigitalFile;
}