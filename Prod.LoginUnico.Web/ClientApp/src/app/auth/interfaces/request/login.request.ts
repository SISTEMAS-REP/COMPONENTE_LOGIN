export interface LoginRequest {
    PersonType?: number; 
    RucNumber?: string; 
    DocumentNumber?: string; 
    Password?: string; 
    RememberMe?: Boolean; 
    ReturnUrl?: string; 
    applicationId?: number 
}
