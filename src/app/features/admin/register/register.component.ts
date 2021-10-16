import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() register = new EventEmitter();
  registerForm = this.fb.group({
    username: '',
    password: '',
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  clickRegister() {
    this.register.emit(this.registerForm.value);
  }
}
