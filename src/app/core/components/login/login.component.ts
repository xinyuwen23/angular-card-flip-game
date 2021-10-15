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
    private auth: AuthService,
    private fb: FormBuilder,
    private lb: LeaderboardService
  ) {}

  ngOnInit(): void {}

  login() {
    this.auth.login$(this.loginForm.value).subscribe((data) => {
      console.log(data.user);
      this.auth.user$.next(data.user);
      this.auth.setSession(data);
    });
  }
}
