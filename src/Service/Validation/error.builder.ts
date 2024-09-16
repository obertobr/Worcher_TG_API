import ConstantsValidation from "./constants.validation"
import ValidationExcpection from "./validation.exception"

export default class ErrorBuilder {

    private _errors: string[] = []


    get errors(): string[]{
        return this._errors
    }

    public addErrorMessage(messageError: string | string[]): void{
        if(Array.isArray(messageError)){
            this._errors = this._errors.concat(messageError)
        } else if (messageError != ""){
            this._errors.push(messageError)
        }
    }

    public clearErrors() : void{
        this._errors = []
    }

    public toThrowErrors(mainErrorMessage: string = ConstantsValidation.defaultMessageError) : void{
        throw new ValidationExcpection(this.errors,mainErrorMessage)
    }

    public hasErrors(): boolean{
       return (this.errors != null && this.errors.length >= 1); 
    }

}