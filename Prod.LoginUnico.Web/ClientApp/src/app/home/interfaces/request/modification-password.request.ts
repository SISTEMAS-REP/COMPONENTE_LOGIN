export interface ModificationPasswordRequest {
  personType?: number;
  applicationId?: number;
  UserName?: string;
  password: string;
  identificador: string;
  current_password?:string;
}