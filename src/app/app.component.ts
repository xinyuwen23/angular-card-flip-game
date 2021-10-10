import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-card-flip-game';
  userSubscribtion!: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.userSubscribtion = this.auth
      .getUser()
      .subscribe((user) => this.auth.user$.next(user));
  }

  ngOnDestroy() {
    this.userSubscribtion.unsubscribe();
  }
}
