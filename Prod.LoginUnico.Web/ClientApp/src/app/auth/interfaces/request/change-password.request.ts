export interface ChangePasswordRequest {
  personType?: number;

  returnUrl?: string;

  applicationId?: number;
  
  Identificador?: string;

  Code?: string;

  Email?: string;

  UserName?: string;
}
