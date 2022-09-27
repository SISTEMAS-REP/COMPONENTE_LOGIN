export interface ReniecResponse {
  personId?: number;

  documentNumber?: string;
  lastName?: string;
  firstName?: string;

  departmentCode?: string;
  department?: string;
  provinceCode?: string;
  province?: string;
  districtCode?: string;
  district?: string;
  ubigeoCode?: string;
  address?: string;

  dateOfBirth?: Date;
  restrictionCode?: string;
  genderCode?: string;
  gender?: string;
  maritalStatusCode?: string;
  maritalStatus?: string;
}
