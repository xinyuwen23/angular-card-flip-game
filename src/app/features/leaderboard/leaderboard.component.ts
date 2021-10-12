import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LeaderboardService } from 'src/app/core/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  displayedColumns = ['position', 'user', 'flips', 'date'];
  userRecordTable: any[] = [];

  constructor(public auth: AuthService, public lb: LeaderboardService) {}

  ngOnInit(): void {}

  createUserRecordsTable() {
    let position = 0;
    this.lb.userRecords.forEach((record: any) => {
      position++;
      this.userRecordTable.push({
        position,
        user: record.user.username,
        flips: record.flips,
        date: record.createdAt,
      });
    });
  }
}
