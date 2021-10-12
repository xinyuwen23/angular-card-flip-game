import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LeaderboardService } from './core/services/leaderboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-card-flip-game';

  constructor(private auth: AuthService, private lb: LeaderboardService) {}

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
