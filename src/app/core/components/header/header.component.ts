import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from '../../services/auth.service';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user?: User;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.auth.getUser$().subscribe((data) => {
      this.auth.user$.next(data.user);
      this.user = this.auth.user$.getValue();
    });
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
