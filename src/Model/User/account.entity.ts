import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";
import User from "./user.entity";

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
}