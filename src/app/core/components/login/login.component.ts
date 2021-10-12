import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(public auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  login() {
    this.auth
      .login(this.loginForm.value)
      .subscribe((data) => (this.auth.user = data.user));
  }
}
