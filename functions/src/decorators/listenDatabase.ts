import 'reflect-metadata';
import {
  MetadataT,
  DatabseListenersTypes,
  DatabaseTypes,
} from './types';

export type ListenDatabaseOptions = {
  dbType: DatabaseTypes;
  ref: string;
  listenerType: DatabseListenersTypes;
};

export function listenDatabase({
  dbType,
  listenerType,
  ref,
}: ListenDatabaseOptions): MethodDecorator {
  return (target: object | any, key: string | symbol) => {
    Reflect.defineMetadata(
      MetadataT.databaseListener,
      {
        dbType,
        listenerType,
        ref,
      },
      target,
      key,
    );
  };
}
