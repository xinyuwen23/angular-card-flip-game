import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user?: User;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  openLoginDialog() {
    this.auth.openLoginDialog();
  }

  openRegisterDialog() {
    this.auth.openRegisterDialog();
  }
}
