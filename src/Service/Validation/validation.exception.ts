import { HttpException, HttpStatus } from "@nestjs/common";
import ConstantsValidation from "./constants.validation";


// Classe usada para armazenar os erros, pode ser lançada como uma excpection throw new ValidationExcpection([]) diretamente

export default class ValidationExcpection extends HttpException {
    constructor(public validationErrors: string[], 
        public errorMessage: string = ConstantsValidation.defaultMessageError){
        super({message: errorMessage, errors: validationErrors}, HttpStatus.BAD_REQUEST)
    }
}