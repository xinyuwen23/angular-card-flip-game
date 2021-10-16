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

  constructor(private auth: AuthService, private lb: LeaderboardService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      this.lb
        .getUserRecords$(user?._id)
        .subscribe((data) => this.lb.userRecords$.next(data.records));
    });
    this.getUser();
  }

  getUser() {
    this.auth.getUser$().subscribe((data) => {
      this.auth.user$.next(data.user);
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
