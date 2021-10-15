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

  getUserRecords(): Observable<any> {
    return this.http.post([environment.baseUrl, 'record/user'].join('/'), {
      _id: this.auth.user._id,
    });
  }

  getAllRecords(): Observable<any> {
    return this.http.get([environment.baseUrl, 'record/all'].join('/'));
  }

  subscribeRecords() {
    this.subscribeAllRecords();
    this.subscribeUserRecords();
  }

  subscribeUserRecords() {
    return this.getUserRecords().subscribe(
      (data) => (this.userRecords = data.records)
    );
  }

  subscribeAllRecords() {
    return this.getAllRecords().subscribe(
      (data) => (this.allRecords = data.records)
    );
  }
}
