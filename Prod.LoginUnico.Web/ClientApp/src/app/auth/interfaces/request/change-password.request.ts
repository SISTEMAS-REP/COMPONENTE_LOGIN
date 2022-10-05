export interface ChangePasswordRequest {
  personType?: number;
  applicationId?: number;
  UserName?: string;
  password: string;
}
