import HasId from "./HasId";
import { Entity } from 'typeorm';

@Entity()
export default abstract class BaseEntity implements HasId {
    
    abstract getId();

}