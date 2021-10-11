import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup = this.fb.group({
    email: '',
    password: '',
  });

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  openRegisterDialog() {
    this.auth.openRegisterDialog();
  }

  login() {
    this.auth.login(this.LoginForm.value);
  }
}
