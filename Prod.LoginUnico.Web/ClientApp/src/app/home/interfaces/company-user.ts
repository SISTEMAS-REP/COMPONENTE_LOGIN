export interface CompanyUser {
  userId: number;
  userName?: string;

  documentNumber?: string;
  lastName?: string;
  firstName?: string;

  phoneNumber?: string;
  email?: string;
  status: boolean;
}
