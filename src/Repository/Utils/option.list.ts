import { FindManyOptions } from "typeorm/find-options/FindManyOptions";

export default class OptionList implements FindManyOptions {
    
    constructor(skip: number,take: number){
        this.skip = skip
        this.take = take
    }

    private _skip: number = 0;
    
    private _take: number = 50;

    
    public get skip() : number {
        return this._skip;
    }

    public set skip(skip: number){
        if(skip){
            this._skip = skip
        }
    }

    public get take() : number {
        return this._take;
    }
    
    public set take(take: number){
        if(take){
            this._take = take
        }
    }

}