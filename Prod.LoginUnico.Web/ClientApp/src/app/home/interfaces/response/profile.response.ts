export interface ProfileResponse {
  user?: User;
  juridicPerson?: JuridicPerson;
  naturalPerson?: NaturalPerson;
}

export interface JuridicPerson {
  juridicPersonId: number;
  rucNumber: string;
  businessName: string;
  businessAddress: string;
}

export interface NaturalPerson {
  naturalPersonId: number;
  documentNumber: string;
  lastName: string;
  firstName: string;
  address: string;
}

export interface User {
  userId: number;
  juridicPersonId: number;
  naturalPersonId: number;
  userName: string;
  phoneNumber: string;
  email: string;
}
