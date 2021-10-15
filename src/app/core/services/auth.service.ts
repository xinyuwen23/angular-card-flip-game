import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent);
  }

  getUser$(): Observable<any> {
    return this.http.get([environment.baseUrl, 'user/get'].join('/'));
  }

  login$(user: any): Observable<any> {
    return this.http.post([environment.baseUrl, 'user/login'].join('/'), user);
  }

  register$(user: any): Observable<any> {
    const newUser = {
      username: user.username,
      password: user.password,
    };
    return this.http.post(
      [environment.baseUrl, 'user/register'].join('/'),
      newUser
    );
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  setSession(data: any) {
    const expiresAt = moment().add(data.expiresIn, 'second');
    localStorage.setItem('id_token', data.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration: any = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
