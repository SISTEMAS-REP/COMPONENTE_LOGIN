export interface SunatResponse {
  personId?: string;

  rucNumber?: string;
  businessName?: string;

  comercialName?: string;
  registrationDate?: Date;

  departmentCode?: string;
  provinceCode?: string;
  districtCode?: string;
  ubigeoCode?: string;
  businessAddress?: string;

  status?: boolean;
  businessType?: string;
  ciiu?: string;
}
