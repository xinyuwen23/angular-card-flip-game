import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent);
  }

  getUser$(): Observable<any> {
    return this.http.get('user/get');
  }

  login(user: any): Observable<any> {
    // return this.http.post([environment.baseUrl, 'user/login'].join('/'), user);
    return this.http.post('user/login', user);
  }

  register(user: any): Observable<any> {
    const newUser = {
      username: user.username,
      password: user.password,
    };
    return this.http.post('user/register', newUser);
  }

  logout() {
    this.user$.next(undefined);
    localStorage.removeItem('id_token');
    // localStorage.removeItem('expires_at');
  }

  setSession(data: any) {
    // const expiresAt = moment().add(data.expiresIn, 'second');
    localStorage.setItem('id_token', data.idToken);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }
}
