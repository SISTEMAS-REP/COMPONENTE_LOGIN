export interface RegisterCompanyRequest {
  applicationId: number;
  sectorId: number;
  personType: number; // enum

  juridicalPersonId?: number; // sunat service
  rucNumber?: string;
  businessName?: string; // sunat (8)
  businessAddress?: string; // sunat (8)

  naturalPersonId: number; // reniec/migraciones service
  documentType?: number;
  documentNumber?: string;
  lastName?: string; // reniec (1)
  firstName?: string; // reniec (1)

  phoneNumber?: string;
  email?: string;
  repeatEmail?: string;

  password?: string;
  repeatPassword?: string;
  termsAndConditions?: boolean;
  termsOfMessaging?: boolean;
}
