import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private message: MessageService,
    private route: Router
  ) {}

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
      return !!decodedToken.sub;
    } else {
      this.message.openSnackBar('You must log in first', 'Close');
      this.route.navigate(['/']);
      return false;
    }
  }
}
