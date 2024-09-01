import { Injectable } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { InjectableImplRegistry } from './injectable.impl.registry';
import ConstantsInjectable from './constants.injectable';

@Injectable()
export class InjectableImplRegistrar {
  constructor(private readonly moduleRef: ModuleRef, private readonly reflector: Reflector) {}

  registerImplementations() {
    const providers = this.moduleRef['providers'];

    providers.forEach((provider: any) => {
        const instance = this.moduleRef.get(provider.name, { strict: false });
        const interfaceToken = this.reflector.get(ConstantsInjectable.INJECTABLE_IMPL_KEY, instance.constructor);
        
        if (interfaceToken) {
            InjectableImplRegistry.register(interfaceToken, provider);
        }
    });
}

}
