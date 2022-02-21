import { LocalStorageService } from './../../utils/localstorage.service';
import {Router, ActivatedRouteSnapshot,  RouterStateSnapshot,   CanActivate} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateLoginComponentService implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if (!this.dataHolder.isUserLoggedIn()) {
        // this.router.navigate();
        return true;
      }
      this.router.navigate(['dashboard']);
      return false;
    }




  constructor(private router: Router, private dataHolder:LocalStorageService) { }

}
