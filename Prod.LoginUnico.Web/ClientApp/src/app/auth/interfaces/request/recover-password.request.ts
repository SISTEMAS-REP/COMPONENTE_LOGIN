export interface RecoverPasswordRequest {
    personType?: number;
  
    rucNumber?: string;
  
    documentNumber?: string;
  
    returnUrl?: string;
  
    applicationId?: number;
    
    email?: string;
  }
  