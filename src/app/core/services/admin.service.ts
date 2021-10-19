import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  users$ = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('user/all');
  }

  addUser(user: any): Observable<any> {
    return this.http.post('user/register', user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put('user/update', user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(['user/delete', userId].join('/'));
  }
}
