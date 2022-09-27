export interface RegisterRequest {
  applicationId: number;
  sectorId: number;
  personType: number; // enum

  personId?: number; // sunat/reniec service

  rucNumber?: string;

  businessName?: string; // sunat (8) // reniec (1)
  departmentCode?: string; // sunat (8) // reniec (1)
  provinceCode?: string; // sunat (8) // reniec (1)
  disctrictCode?: string; // sunat (8) // reniec (1)
  address?: string; //businessAddress?: string; // sunat (8) // reniec (1)

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
