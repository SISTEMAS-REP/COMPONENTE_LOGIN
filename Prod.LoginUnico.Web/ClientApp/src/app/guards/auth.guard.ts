import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      take(1),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['presentation'], {
            queryParamsHandling: 'preserve',
          });
        }
      }),
      catchError(() =>
        this.router.navigate(['presentation'], {
          queryParamsHandling: 'preserve',
        })
      )
    );
  }
}
