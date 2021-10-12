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
    this.lb.subscribeRecords();
  }
}
