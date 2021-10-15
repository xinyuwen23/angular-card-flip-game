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
    username: '',
    password: '',
    password2: '',
  });

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  register() {
    this.auth
      .register$(this.registerForm.value)
      .subscribe((data) => this.auth.user$.next(data.user));
  }
}
