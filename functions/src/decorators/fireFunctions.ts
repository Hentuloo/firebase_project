import { SUPPORTED_REGIONS } from 'firebase-functions';
import 'reflect-metadata';
import { MetadataT, FireFunctionsTypes } from './types';

export type FireFunctionOptions = {
  region: typeof SUPPORTED_REGIONS[number];
  type: FireFunctionsTypes;
};

export function fireFunction({
  region,
  type,
}: FireFunctionOptions): MethodDecorator {
  return (target: object | any, key: string | symbol) => {
    Reflect.defineMetadata(
      MetadataT.fireFunction,
      { type, region },
      target,
      key,
    );
  };
}
