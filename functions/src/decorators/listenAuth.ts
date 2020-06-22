import 'reflect-metadata';
import { MetadataT, ListenAuthTypes } from './types';

export type ListenAuthOptions = {
  type: ListenAuthTypes;
};

export function listenAuth({
  type,
}: ListenAuthOptions): MethodDecorator {
  return (target: object | any, key: string | symbol) => {
    Reflect.defineMetadata(
      MetadataT.authListener,
      { type },
      target,
      key,
    );
  };
}
