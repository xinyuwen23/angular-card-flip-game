import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { LeaderboardService } from './leaderboard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  user: any;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private lb: LeaderboardService
  ) {}

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent);
  }

  login$(user: any): Observable<any> {
    return this.http.post(
      [environment.baseUrl, 'user/login'].join('/'),
      user,
      this.httpOptions
    );
  }

  login(user: any) {
    this.login$(user).subscribe((data) => {
      this.user = data.user;
      this.setSession(data);
      this.lb.subscribeRecords();
    });
  }

  register(user: any): Observable<any> {
    const newUser = {
      username: user.username,
      password: user.password,
    };
    return this.http.post(
      [environment.baseUrl, 'user/register'].join('/'),
      newUser,
      this.httpOptions
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
