import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  userRecords$ = new BehaviorSubject(undefined);
  allRecords$ = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) {}

  getUserRecords$(
    userId: string | undefined
  ): Observable<{ code: number; records: any }> {
    return this.http.post<{ code: number; records: any }>('record/user', {
      _id: userId,
    });
  }

  getAllRecords$(): Observable<{ code: number; records: any }> {
    return this.http.get<{ code: number; records: any }>('record/all');
  }
}
