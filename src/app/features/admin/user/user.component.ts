import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() user: any;
  @Output() updateUsername = new EventEmitter();
  @Output() updatePassword = new EventEmitter();
  @Output() delete = new EventEmitter();
  updateUsernameForm = this.fb.group({
    username: ['', Validators.required],
  });
  updatePasswordForm = this.fb.group({
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  clickUpdateUsername() {
    this.updateUsername.emit({
      _id: this.user._id,
      username: this.updateUsernameForm.value.username,
    });
  }

  clickUpdatePassword() {
    this.updatePassword.emit({
      _id: this.user._id,
      password: this.updatePasswordForm.value.password,
    });
  }

  clickDelete() {
    this.delete.emit(this.user._id);
  }
}
