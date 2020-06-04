import * as functions from 'firebase-functions';
import { MethodOptions } from './fireFunctions';

interface fni {
  [key: string]: any;
}

export class FunctionsIndex implements fni {
  [key: string]: any;
}

class Controller extends FunctionsIndex {}
export type IController = Controller;

export function bindFirebaseControllers(
  controllers: IController[],
  middleClass?: any,
) {
  const bindedFireFunctions = {};
  // ADDING CONTROLLER CLASSES AS PARAMETER AND LOOPING OVER EACH CONTROLLER
  for (let controller of controllers) {
    // GETTING PROTOTYPE OF CONTROLLER, CLASS MIDDLEWARE WILL BE A THING IN THE FUTURE
    let prot = Object.getPrototypeOf(controller);

    // GETTING ALL METHODS/FUNCTIONS OF THAT CONTROLLER
    let methods = Object.getOwnPropertyNames(prot);

    // THE LOOP THAT EXPORTS YOUR CLASS METHODS AS FIREBASE FUNCTIONS
    for (let fn of methods) {
      // THE CONSTRUCTOR IS COUNTED AS A METHOD SO WE NEED TO DITCH THAT HERE
      if (fn === 'constructor') {
        //
      } else {
        // GETTING THE OPTIONS WE SAVED ON THE FUNCTION PROTOTYPE WITH THE @FireFunction DECORATOR
        let options: MethodOptions = Object.getPrototypeOf(
          controller[fn],
        ).options;

        // GETTING THE MIDDLEWARE WE SAVED ON THE FUNCTION PROTOTY WITH THE @CallMiddleware DECORATOR
        let middleware = Object.getPrototypeOf(controller[fn])
          .middleware;

        // CURRENTLY JUST FOCUSING ON THE ONCALL FUNCTIONS
        if (options && options.type === 'onCall') {
          const fireFunctionName = fn.charAt(0) + fn.slice(1);

          const fireFunctionMethod = functions
            .region(options.region)
            .https.onCall(
              async (
                data: any,
                context: functions.https.CallableContext,
              ) => {
                try {
                  if (middleware && middleware.length > 0) {
                    for await (const fn of middleware) {
                      await fn(data, context);
                    }
                    return controller[fn](data, context);
                  }
                } catch ({ code, message, details, name }) {
                  throw new functions.https.HttpsError(
                    'unknown',
                    code,
                    {
                      message,
                      details,
                      name,
                    },
                  );
                }
              },
            );

          bindedFireFunctions[fireFunctionName] = fireFunctionMethod;
        }
      }
    }
  }

  return {
    create: (ex: any) => {
      const keys = Object.keys(bindedFireFunctions);
      keys.forEach(key => (ex[key] = bindedFireFunctions[key]));
    },
  };
}
