import 'reflect-metadata';
import { MetadataT, ListenDatabseTypes } from './types';

export type ListenDatabaseOptions = {
  ref: string;
  type: ListenDatabseTypes;
};

export function listenDatabase({
  type,
  ref,
}: ListenDatabaseOptions): MethodDecorator {
  return (target: object | any, key: string | symbol) => {
    Reflect.defineMetadata(
      MetadataT.databaseListener,
      { type, ref },
      target,
      key,
    );
  };
}
