import { MetadataT } from './types';
import 'reflect-metadata';

export const use = (newMiddleware: Function) => {
  return (target: object | any, key: string | symbol) => {
    const middlewares =
      Reflect.getMetadata(MetadataT.middleware, target, key) || [];
    Reflect.defineMetadata(
      MetadataT.middleware,
      [...middlewares, newMiddleware],
      target,
      key,
    );
  };
};
