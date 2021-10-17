import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UploadComponent } from 'src/app/features/game/components/upload/upload.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  flips?: number;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  openUploadDialog() {
    this.dialog.open(UploadComponent);
  }

  upload$(userId: string): Observable<{ code: number; record: any }> {
    return this.http.post<{ code: number; record: any }>(
      [environment.baseUrl, 'record/upload'].join('/'),
      {
        _id: userId,
        flips: this.flips,
      }
    );
  }
}
