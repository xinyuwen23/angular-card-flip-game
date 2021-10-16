import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  users$ = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get([environment.baseUrl, 'user/all'].join('/'));
  }

  addUser(user: any): Observable<any> {
    return this.http.post(
      [environment.baseUrl, 'user/register'].join('/'),
      user
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put([environment.baseUrl, 'user/update'].join('/'), user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(
      [environment.baseUrl, 'user/delete', userId].join('/')
    );
  }
}
