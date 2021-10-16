import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    password2: this.fb.control('', [Validators.required]),
  });

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  register() {
    this.auth
      .register$(this.registerForm.value)
      .subscribe((data) => this.auth.user$.next(data.user));
  }
}
