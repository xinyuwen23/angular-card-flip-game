import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  errorMessage = 'Admin only';
  actionMessage = 'Close';

  constructor(private auth: AuthService, private message: MessageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.user$.getValue()?.isAdmin) return true;
    this.message.openSnackBar(this.errorMessage, this.actionMessage);
    return false;
  }
}
