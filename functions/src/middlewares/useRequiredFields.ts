import { https } from 'firebase-functions';

export const useRequiredFields = (...fieldsNames: string[]) => {
  return (data: any, context: https.CallableContext) => {
    if (!data) {
      throw new https.HttpsError(
        'invalid-argument',
        'not any data is passed',
      );
    }
    fieldsNames.forEach(field => {
      if (!data[field]) {
        throw new https.HttpsError(
          'invalid-argument',
          'field is required',
          { fieldName: field },
        );
      }
    });
  };
};
