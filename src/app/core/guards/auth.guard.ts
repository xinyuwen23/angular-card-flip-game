import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private message: MessageService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('id_token');
    if (token) {
      const decodedToken = jwt_decode(token) as any;
      if (decodedToken.sub && moment().isBefore(decodedToken.exp * 1000)) {
        return true;
      }
      this.route.navigate(['/']);
      return false;
    } else {
      this.message.openSnackBar('You must log in first', 'Close');
      this.route.navigate(['/']);
      return false;
    }
  }
}
