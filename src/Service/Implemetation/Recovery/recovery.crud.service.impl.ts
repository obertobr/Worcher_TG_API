import { Inject, Injectable } from "@nestjs/common";
import BaseCrudService from "../base.crud.service";
import ErrorBuilder from "src/Service/Validation/error.builder";

import Address from "src/Model/Address/address.entity";

import Recovery from "src/Model/Recovery/recovery.entity";
import RecoveryCrudRepositoryInterface from "src/Repository/Interface/Recovery/recovery.crud.repository.interface";
import RecoveryCrudServiceInterface from "src/Service/Interface/Recovery/recovery.crud.service.interface";
import Account from "src/Model/User/account.entity";
import { ScheduleModule } from '@nestjs/schedule';
import { Cron } from '@nestjs/schedule';
@Injectable()
export default class RecoveryCrudServiceImpl extends BaseCrudService<Recovery> implements RecoveryCrudServiceInterface {
    private RecoveryRepository: RecoveryCrudRepositoryInterface
    constructor(@Inject(RecoveryCrudRepositoryInterface) repository: RecoveryCrudRepositoryInterface) {
        super(repository);
        this.RecoveryRepository = repository
    }



    protected beforeSave(entity: Recovery): void {
        entity.date_generation = new Date();
    }

    async validate(entity: Recovery): Promise<ErrorBuilder> {
        const errorBuilder = new ErrorBuilder()
        if(entity.recovery_code.toString().length !== 6){
            errorBuilder.addErrorMessage("wrong code")
        }else if(entity.recovery_code == null){
            errorBuilder.addErrorMessage("code cannot be empty")
        }
    
        return errorBuilder;
    }
    async findRecoveryAccount(account:Account):Promise<Recovery>{

        return this.RecoveryRepository.findRecoveryAccount(account)
    }
//'0 0 * * *'
//getHours() - 24
    @Cron('*/5 * * * *')
  async removeExpiredRecoveryCodes() {
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getMinutes() -10); 

    const expiredCodes = await this.RecoveryRepository.findByDate(expirationTime);

    if (expiredCodes.length > 0) {

        for(let code of expiredCodes){
           await this.RecoveryRepository.delete(code.id)
        }
    }
  }
    
}