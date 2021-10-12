import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/core/services/game.service';
import { LeaderboardService } from 'src/app/core/services/leaderboard.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  constructor(
    public game: GameService,
    private auth: AuthService,
    private lb: LeaderboardService
  ) {}

  ngOnInit(): void {}

  upload() {
    this.game.upload().subscribe((_) => {
      this.getUserRecord();
      this.getAllRecords();
    });
  }

  getUserRecord() {
    if (this.auth.user) {
      this.lb
        .getUserRecords()
        .subscribe((data) => (this.lb.userRecords = data.records));
    }
  }

  getAllRecords() {
    this.lb
      .getAllRecords()
      .subscribe((data) => (this.lb.allRecords = data.records));
  }
}
