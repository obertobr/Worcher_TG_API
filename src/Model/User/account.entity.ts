import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import User from "./user.entity";
import Recovery from "../Recovery/recovery.entity";

@Entity()
export default class Account extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'email'})
  email: string;

  @Column({name: 'password'})
  password: string;

  @OneToOne(() => User, user => user.account)
  user: User;

  @OneToOne(() => Recovery, recovery => recovery.account)
  recovery: Recovery;
}