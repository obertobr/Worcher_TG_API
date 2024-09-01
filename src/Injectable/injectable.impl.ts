import { SetMetadata, Type } from '@nestjs/common';
import ConstantsInjectable from './constants.injectable';

export function InjectableImpl(token: any): ClassDecorator {
  return SetMetadata(ConstantsInjectable.INJECTABLE_IMPL_KEY, token);
}