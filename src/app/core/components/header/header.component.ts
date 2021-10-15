import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user?: any;

  constructor(private auth: AuthService, private lb: LeaderboardService) {}

  ngOnInit(): void {
    this.auth
      .getUser$()
      .subscribe((data) => this.auth.user$.next(data.user))
      .add(
        this.auth.user$
          .subscribe((user) => (this.user = user))
          .add(this.lb.subscribeRecords(this.user && this.user._id))
      );
  }

  openLoginDialog() {
    this.auth.openLoginDialog();
  }

  openRegisterDialog() {
    this.auth.openRegisterDialog();
  }

  logout() {
    this.auth.logout();
  }
}
