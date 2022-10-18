import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParamsGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const appParam = route.queryParams['applicationId'];

    if (!appParam || appParam === '' || appParam === '0') {
      return this.router.navigate(['presentation'], {
        queryParamsHandling: 'preserve',
      });
    }

    const urlParam = route.queryParams['returnUrl'];

    if (
      !urlParam ||
      urlParam === '' ||
      !['http://', 'https://'].includes(urlParam)
    ) {
      return this.router.navigate(['presentation'], {
        queryParamsHandling: 'preserve',
      });
    }

    return true;
  }
}
