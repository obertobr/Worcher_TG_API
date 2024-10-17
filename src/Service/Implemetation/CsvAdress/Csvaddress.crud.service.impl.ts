// csv.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Address from 'src/Model/Address/address.entity';
import City from 'src/Model/Address/city.entity';
import State from 'src/Model/Address/state.entity';



@Injectable()
export class CsvService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(City) private cityRepository: Repository<City>,
    @InjectRepository(State) private stateRepository: Repository<State>,
  ) {}
  
  
  
  async processCsv(stateFilePath: string, cityFilePath: string) {
    
    const  dataRecords =await this.cityRepository.count()
    if(dataRecords > 0){
      return
    }
    await this.processStates(stateFilePath);
    await this.processCities(cityFilePath);
  }

  private async processStates(filePath: string) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ',' }))
        .on('data', async (data) => {
          const newState = this.stateRepository.create({
            id: data.codigo_uf, 
            uf: data.uf,
            name: data.nome,
          });
          await this.stateRepository.save(newState);
        })
        .on('end', () => {
          resolve(true);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  private async processCities(filePath: string) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: ',' }))
        .on('data', async (data) => {
       
          const savedState = await this.stateRepository.findOne({ where: { id: data.codigo_uf } });
          if (savedState) {
            const newCity = this.cityRepository.create({
              name: data.nome,
              state: savedState,
            });
            await this.cityRepository.save(newCity);
          }
        })
        .on('end', () => {
          resolve(true);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
