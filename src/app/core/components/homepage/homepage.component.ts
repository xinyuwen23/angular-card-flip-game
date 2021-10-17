import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  user?: User;
  userSubscription?: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.auth.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  openLoginDialog() {
    this.auth.openLoginDialog();
  }
}
