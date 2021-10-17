import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  users$ = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<{ code: number; users: any }> {
    return this.http.get<{ code: number; users: any }>(
      [environment.baseUrl, 'user/all'].join('/')
    );
  }

  addUser(user: { username: string; password: string }): Observable<{
    code: number;
    user?: User;
    idToken?: any;
    expiresIn?: any;
  }> {
    return this.http.post<{
      code: number;
      user?: User;
      idToken?: any;
      expiresIn?: any;
    }>([environment.baseUrl, 'user/register'].join('/'), user);
  }

  updateUser(user: {
    _id: string;
    username?: string;
    password?: string;
  }): Observable<{ code: number }> {
    return this.http.put<{ code: number }>(
      [environment.baseUrl, 'user/update'].join('/'),
      user
    );
  }

  deleteUser(userId: string): Observable<{ code: number }> {
    return this.http.delete<{ code: number }>(
      [environment.baseUrl, 'user/delete', userId].join('/')
    );
  }
}
