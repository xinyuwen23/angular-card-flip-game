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
  button = '1';

  constructor(public lb: LeaderboardService) {}

  ngOnInit(): void {}
}
