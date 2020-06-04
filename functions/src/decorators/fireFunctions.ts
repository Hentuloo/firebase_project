import * as functions from 'firebase-functions';
import { SUPPORTED_REGIONS } from 'firebase-functions';
/***********************************************************************************************
 *                                      Method Decorators
 **********************************************************************************************/
/**
 * @param region The region of your function, for example: 'europe-west1'
 * @param type can be onCall or onRequest
 */

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
