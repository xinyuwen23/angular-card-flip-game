import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: '',
    password: '',
  });

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private lb: LeaderboardService
  ) {}

  ngOnInit(): void {}

  login() {
    this.auth.login(this.loginForm.value).subscribe((data) => {
      this.auth.user = data.user;
      this.getAllRecords();
      this.getUserRecord();
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
