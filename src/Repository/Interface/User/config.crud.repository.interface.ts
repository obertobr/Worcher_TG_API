import Config from "src/Model/User/config.entity";
import AbstractCrudRepositoryInterface from "../abstract.crud.repository.interface";

export default interface ConfigCrudRepositoryInterface extends AbstractCrudRepositoryInterface<Config> {

    getTeste();
    
}