import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../interfaces/entities/usuario';
//import { map } from 'rxjs/operators';

//import { environment } from '@environments/environment';
// import { Usuario } from '@app/interfaces/entities/usuario';

const utf8_to_b64 = (str: string | number | boolean) => {
    return window.btoa(unescape(encodeURIComponent(str)));
};

const b64_to_utf8 = (str: string) => {
    return decodeURIComponent(escape(window.atob(str)));
};

declare global {
    interface Window {
        $$userinfo: any;
        $$configinfo: any;
    }
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject!: BehaviorSubject<Usuario>;
    //public currentUser: Observable<Usuario>;
    
    private user: any = null;
    private config: any = null;
    private file: any = null;
    private permissions: Array<any> = [];
    //private permissions: Array<IPERMISO> = [];
    private role: any = null;

    constructor(private http: HttpClient) {
        // this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
        
    }
    
    public setUserToken = (token: string) => {
        const decoded_userdata = b64_to_utf8(token);
        this.user = JSON.parse(decoded_userdata);
    }

    public setConfigToken = (token: string) => {
        const decoded_configdata = b64_to_utf8(token);
        this.config = JSON.parse(decoded_configdata);
    }

    public setConfigFile = (cadena: string) => {
        const decoded_configdata = b64_to_utf8(cadena);
        this.file = JSON.parse(decoded_configdata);
    }
    
    public setUserPermissions = (token: string) => {
      const decoded_userdata = b64_to_utf8(token);
      this.permissions = JSON.parse(decoded_userdata);
    };
    
    public GetUser = () => this.user;
    public GetConfig = () => this.config;
    public GetConfigFile = () => this.file;
    public GetPermissions = () => this.permissions;
    
    public UserHasPermission = (permissions: Array<string>) => {
        return permissions.filter(x => {
          return this.permissions.filter(m => m.codigo.toUpperCase() == x.toUpperCase()).length > 0;
          
        }).length > 0;
      };
    
    /* public SetCurrentRole = (role: any) =>  {
    this.role = role;
    return this;
    }; */
    
    /* public GetCurrentRole = () => this.role; */

    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }

    /* login() {
        return this.http.post<any>(`${environment.apiUrl}/Home/IndexP`, null)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    } */

    /* logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    } */
}
