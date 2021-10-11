import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

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

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openRegisterDialog() {
    this.dialog.open(RegisterComponent);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:4000/user/login',
      user,
      this.httpOptions
    );
  }

  register(user: any): Observable<any> {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    return this.http.post<any>(
      'http://localhost:4000/user/register',
      newUser,
      this.httpOptions
    );
  }

  logout() {
    this.user = undefined;
  }
}
