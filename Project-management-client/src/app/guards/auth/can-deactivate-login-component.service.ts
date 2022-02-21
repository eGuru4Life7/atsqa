import { LocalStorageService } from './../../utils/localstorage.service';
import {Router, RouterStateSnapshot,  ActivatedRouteSnapshot,   CanActivate} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanDeactivateLoginComponentService implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if (this.dataHolder.isUserLoggedIn()){
        return true;
      }
      this.router.navigate(['login']);
      return false;
    }


  constructor(private router: Router, private dataHolder: LocalStorageService) { }

}
