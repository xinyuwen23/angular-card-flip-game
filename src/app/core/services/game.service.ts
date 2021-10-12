import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UploadComponent } from 'src/app/features/game/components/upload/upload.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  flips?: number;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private auth: AuthService
  ) {}

  openUploadDialog() {
    this.dialog.open(UploadComponent);
  }

  upload(): Observable<any> {
    return this.http.post(
      [environment.baseUrl, 'record/upload'].join('/'),
      { _id: this.auth.user._id, flips: this.flips },
      this.httpOptions
    );
  }
}
