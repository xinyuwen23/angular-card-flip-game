import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() user: any;
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  updateForm = this.fb.group({
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateForm.get('username')?.setValue(this.user.username);
  }

  clickUpdate() {
    this.update.emit({
      username: this.user.username,
      password: this.updateForm.value.password,
    });
  }

  clickDelete() {
    this.delete.emit(this.user._id);
  }
}
