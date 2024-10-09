import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Recovery extends BaseEntity{
  
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'user_id', nullable: false})
  user_id: number;

  @Column({name: 'recovery_code', nullable: false})
  recovery_code: number;

  @Column({name: 'date_generation', nullable: false})
  date_generation: Date;

}
