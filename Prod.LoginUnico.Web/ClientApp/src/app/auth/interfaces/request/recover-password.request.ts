export interface RecoverPasswordRequest {
    personType?: number;
  
    rucNumber?: string;
  
    documentNumber?: string;
  
    password?: string;
  
    rememberMe?: boolean;
  
    returnUrl?: string;
  
    applicationId?: number;
    
    email?: string;
  }
  