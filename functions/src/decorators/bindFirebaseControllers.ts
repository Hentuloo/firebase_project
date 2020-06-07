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
    for (let fName of methods) {
      // THE CONSTRUCTOR IS COUNTED AS A METHOD SO WE NEED TO DITCH THAT HERE
      if (fName === 'constructor') {
        //
      } else {
        const functionProto = Object.getPrototypeOf(
          controller[fName],
        );
        const {
          options,
          middlewares: { [fName]: middlewares },
        } = functionProto;

        // CURRENTLY JUST FOCUSING ON THE ONCALL FUNCTIONS
        if (options && options.type === 'onCall') {
          const fireFunctionName = fName.charAt(0) + fName.slice(1);

          const fireFunctionMethod = functions
            .region(options.region)
            .https.onCall(
              async (
                data: any,
                context: functions.https.CallableContext,
              ) => {
                try {
                  if (middlewares && middlewares.length > 0) {
                    for await (const fn of middlewares) {
                      await fn(data, context);
                    }
                    return controller[fName](data, context);
                  }
                } catch ({ code, message, details, name }) {
                  console.error(
                    JSON.stringify({ code, message, details, name }),
                  );
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

  return bindedFireFunctions;
}
