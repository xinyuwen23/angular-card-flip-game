import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  constructor(public auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  openLoginDialog() {
    this.auth.openLoginDialog();
  }

  register() {
    this.auth
      .register(this.registerForm.value)
      .subscribe((data) => (this.auth.user = data.user));
  }
}
