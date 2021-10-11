import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginInfo } from '../interfaces/loginInfo';
import { User } from '../interfaces/user';
import { UserResponse } from '../interfaces/userResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    }),
  };
  user$ = new Subject<User>();

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent);
  }

  getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>('http://localhost:4000/user/get_user');
  }

  login(loginInfo: LoginInfo) {
    return this.http.post<UserResponse>(
      'http://localhost:4000/user/login',
      loginInfo,
      this.httpOptions
    );
  }
}
