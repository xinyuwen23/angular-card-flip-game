import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  userRecords: any;
  allRecords: any;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getUserRecords(userId: any): Observable<any> {
    return this.http.post([environment.baseUrl, 'record/user'].join('/'), {
      _id: userId,
    });
  }

  getAllRecords(): Observable<any> {
    return this.http.get([environment.baseUrl, 'record/all'].join('/'));
  }

  subscribeRecords(userId:any) {
    this.subscribeAllRecords();
    this.subscribeUserRecords(userId);
  }

  subscribeUserRecords(userId:any) {
    return this.getUserRecords(userId).subscribe(
      (data) => (this.userRecords = data.records)
    );
  }

  subscribeAllRecords() {
    return this.getAllRecords().subscribe(
      (data) => (this.allRecords = data.records)
    );
  }
}
