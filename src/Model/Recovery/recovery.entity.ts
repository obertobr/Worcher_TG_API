import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Account from "../User/account.entity";

@Entity()
export default class Recovery extends BaseEntity{
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  
  @OneToOne(() => Account, account => account.recovery,{nullable:false,eager:true})
  @JoinColumn()
  account: Account;
  

  @Column({name: 'recovery_code', nullable: false})
  recovery_code: number;

  @Column({name: 'date_generation', nullable: false})
  date_generation: Date;

}
