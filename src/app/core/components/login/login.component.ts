import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private message: MessageService
  ) {}

  ngOnInit(): void {}

  login() {
    this.auth.login$(this.loginForm.value).subscribe((data) => {
      this.auth.user$.next(data.user);
      this.auth.setSession(data);
      this.message.openSnackBar('Welcome', 'Close');
    });
  }
}
