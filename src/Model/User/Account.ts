import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn()

  @Column({name: 'id'})
  private _id: number;

  @Column({name: 'email'})
  private _email: string;

  @Column({name: 'password'})
  private _password: string;

  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get password() {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

}