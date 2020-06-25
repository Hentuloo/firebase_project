import Validator from 'validatorjs';

export const validator = (
  body: any,
  rules: Validator.Rules,
  customMessages?: Validator.ErrorMessages | undefined,
) => new Validator(body, rules, customMessages);

export const getFirstValidatorError = (errors: Validator.Errors) => {
  const keys = Object.keys(errors.errors);
  return errors.first(keys[0]);
};
export const validImageFile = ({
  size,
  type,
}: {
  size: number;
  type: string;
}) => {
  if (size < 600 || size > 1000000) {
    return { ok: false, message: 'Invalid size' };
  }
  if (
    type !== 'image/png' &&
    type !== 'image/jpg' &&
    type !== 'image/jpeg'
  ) {
    return { ok: false, message: 'Invalid file type (png or jpg)' };
  }
  return { ok: true };
};
