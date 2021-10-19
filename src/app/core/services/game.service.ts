import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UploadComponent } from 'src/app/features/game/components/upload/upload.component';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  flips?: number;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  openUploadDialog() {
    this.dialog.open(UploadComponent);
  }

  upload(userId: string): Observable<any> {
    return this.http.post('record/upload', {
      _id: userId,
      flips: this.flips,
    });
  }
}
