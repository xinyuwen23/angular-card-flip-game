import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  userRecords$ = new BehaviorSubject(undefined);
  allRecords$ = new BehaviorSubject(undefined);

  constructor(private http: HttpClient) {}

  getUserRecords$(userId: string | undefined): Observable<any> {
    return this.http.post([environment.baseUrl, 'record/user'].join('/'), {
      _id: userId,
    });
  }

  getAllRecords$(): Observable<any> {
    return this.http.get([environment.baseUrl, 'record/all'].join('/'));
  }
}
