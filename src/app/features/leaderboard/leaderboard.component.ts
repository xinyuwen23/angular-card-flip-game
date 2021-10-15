import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { LeaderboardService } from 'src/app/core/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  allRecords: any;
  userRecords: any;
  displayedColumns = ['position', 'user', 'flips', 'date'];
  button = '1';

  constructor(private auth: AuthService, private lb: LeaderboardService) {}

  ngOnInit(): void {
    this.lb.getAllRecords().subscribe((data) => {
      this.lb.allRecords$.next(data.records);
      this.allRecords = this.lb.allRecords$.getValue();
    });
    this.lb
      .getUserRecords(this.auth.user$.getValue()?._id)
      .subscribe((data) => this.lb.userRecords$.next(data.records));
    this.userRecords = this.lb.userRecords$.getValue();
  }
}
