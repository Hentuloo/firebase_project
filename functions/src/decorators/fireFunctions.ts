import * as functions from 'firebase-functions';
import { SUPPORTED_REGIONS } from 'firebase-functions';

export type MethodOptions = {
  region: typeof SUPPORTED_REGIONS[number];
  type: 'onCall' | 'onRequest';
};

export function fireFunction(
  options: MethodOptions,
): MethodDecorator {
  return (target: object | any, key: string | symbol) => {
    Object.getPrototypeOf(target[key]).options = options;
    Object.getPrototypeOf(target[key]).fName = key as string;
  };
}

export interface Index {
  [key: string]: any;
}

export type Context = functions.https.CallableContext;
