export enum CustomErrorType {
  error,
  warning,
}

export interface CustomError {// extends Error {
  errorType: CustomErrorType;
  title: string;
  status: number | string | undefined;
  detail: string | undefined;
  errors: string | undefined;
}
