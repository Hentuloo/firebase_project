import { database, region, https } from 'firebase-functions';
import { MetadataT } from './types';
import { FireFunctionOptions } from './fireFunctions';
import { ListenDatabaseOptions } from './listenDatabase';

class Controller {
  [key: string]: any;
}
export type IController = Controller;

interface BindFireFunctionType extends FireFunctionOptions {
  middlewares: Function[];
  controller: object;
  method: string;
}

const bindFireFunction = ({
  region: choosedRegion,
  type,
  middlewares,
  controller,
  method,
}: BindFireFunctionType) => {
  return region(choosedRegion).https[type](async (data, context) => {
    try {
      for await (const fn of middlewares) {
        await fn(data, context);
      }
      return controller[method](data, context);
    } catch ({ code, message, details, name }) {
      console.error(JSON.stringify({ code, message, details, name }));
      throw new https.HttpsError('unknown', code, {
        message,
        details,
        name,
      });
    }
  });
};
interface BindDatabaseListenerType extends ListenDatabaseOptions {
  middlewares: Function[];
  controller: object;
  method: string;
}
const bindDatabaseListener = ({
  type,
  middlewares,
  controller,
  method,
  ref,
}: BindDatabaseListenerType) => {
  return database.ref(ref)[type](async (data, context) => {
    try {
      for await (const fn of middlewares) {
        await fn(data, context);
      }
      return controller[method](data, context);
    } catch ({ code, message, details, name }) {
      console.error(JSON.stringify({ code, message, details, name }));
      throw new https.HttpsError('unknown', code, {
        message,
        details,
        name,
      });
    }
  });
};

export const bindFireControllers = (controllers: IController[]) => {
  let fireMethods = {};
  controllers.forEach(controller => {
    const methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(controller),
    );

    methods.forEach(method => {
      if (method === undefined || method === 'constructor') return;
      const middlewares =
        Reflect.getMetadata(
          MetadataT.middleware,
          controller,
          method,
        ) || [];

      const fireFunction = Reflect.getMetadata(
        MetadataT.fireFunction,
        controller,
        method,
      ) as FireFunctionOptions;

      if (fireFunction) {
        fireMethods[method] = bindFireFunction({
          controller,
          method,
          middlewares,
          region: fireFunction.region,
          type: fireFunction.type,
        });
      }

      const databaseListener = Reflect.getMetadata(
        MetadataT.databaseListener,
        controller,
        method,
      ) as ListenDatabaseOptions;
      if (databaseListener) {
        fireMethods[method] = bindDatabaseListener({
          controller,
          method,
          middlewares,
          ref: databaseListener.ref,
          type: databaseListener.type,
        });
      }
    });
  });
  return fireMethods;
};
