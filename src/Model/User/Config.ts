import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from "../BaseEntity";

export default class Config extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    @Column({name: 'id'})
    private _id: number;
    
    @Column({name: 'reciveEmails'})
    private _reciveEmails: boolean;

    @Column({name: 'reciveNotifications'})
    private _reciveNotifications: boolean;


    get id() {
       return this._id;
    }

    set id(id: number){
        this._id = id;
    }

    get reciveEmails() {
        return this._reciveEmails;
     }
 
     set reciveEmails(reciveEmails: boolean){
         this._reciveEmails = reciveEmails;
     }

     get reciveNotifications() {
        return this._reciveNotifications;
     }
 
     set reciveNotifications(reciveNotifications: boolean){
         this._reciveNotifications = reciveNotifications;
     }
 
}