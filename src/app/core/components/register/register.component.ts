import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmedValidator } from 'src/app/shared/validators/confirmed.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    },
    { validator: confirmedValidator('password', 'password2') }
  );

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  register() {
    this.auth
      .register$(this.registerForm.value)
      .subscribe((data) => this.auth.user$.next(data.user));
  }
}
