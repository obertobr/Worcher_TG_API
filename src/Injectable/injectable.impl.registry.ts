import { Type } from "@nestjs/common";

export class InjectableImplRegistry {
    private static registry = new Map<Type<any>, Type<any>>();
  
    static register(interfaceType: Type<any>, implementationType: Type<any>) {
        this.registry.set(interfaceType, implementationType);
      }
    
      static getImplementations(): Map<Type<any>, Type<any>> {
        return this.registry;
      }
  }
  