import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../baseEntity";

@Entity()
export default class Account extends BaseEntity {
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'email'})
  email: string;

  @Column({name: 'password'})
  password: string;

}