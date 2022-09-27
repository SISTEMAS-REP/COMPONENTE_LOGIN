import { CustomErrorType, CustomError } from '../interfaces/custom-error';

export const UNKNOWN_ERROR: CustomError = {
  errorType: CustomErrorType.error,
  title: 'Error desconocido',
  status: 0,
  detail: 'Token es nulo',
  errors: undefined,
};

export const ACCOUNT_ISNULL: CustomError = {
  errorType: CustomErrorType.error,
  title: 'Usuario no válido',
  status: 0,
  detail: 'Usuario es nulo',
  errors: undefined,
};

export const TOKEN_ISNULL: CustomError = {
  errorType: CustomErrorType.error,
  title: 'Sesión no válida',
  status: 0,
  detail: 'Token es nulo',
  errors: undefined,
};

export const ACCOUNT_NULL_ERROR: CustomError = {
  errorType: CustomErrorType.error,
  title: 'No existe usuario',
  status: 0,
  detail: 'No se encontro el usuario',
  errors: undefined,
};

export const SESSION_NULL_ERROR: CustomError = {
  errorType: CustomErrorType.error,
  title: 'No existe session',
  status: 0,
  detail: 'No se encontro la sessión',
  errors: undefined,
};
