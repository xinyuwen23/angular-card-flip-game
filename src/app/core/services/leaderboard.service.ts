import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  userRecords: any;
  allRecords: any;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getUserRecords(): Observable<any> {
    return this.http.post(
      [environment.baseUrl, 'record/user'].join('/'),
      { _id: this.auth.user._id },
      this.httpOptions
    );
  }

  getAllRecords(): Observable<any> {
    return this.http.get([environment.baseUrl, 'record/all'].join('/'));
  }

  subscribeRecords() {
    this.subscribeAllRecords();
    this.subscribeUserRecords();
  }

  subscribeUserRecords() {
    if (this.auth.user) {
      this.getUserRecords().subscribe(
        (data) => (this.userRecords = data.records)
      );
    }
  }

  subscribeAllRecords() {
    this.getAllRecords().subscribe((data) => (this.allRecords = data.records));
  }
}
