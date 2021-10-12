import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LeaderboardService } from 'src/app/core/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  constructor(public auth: AuthService, private lb: LeaderboardService) {}

  ngOnInit(): void {
    this.getAllRecords();
    this.getUserRecord();
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
