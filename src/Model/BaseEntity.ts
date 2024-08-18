import HasId from "./HasId";

export default abstract class BaseEntity implements HasId {
    
    abstract get id();

}