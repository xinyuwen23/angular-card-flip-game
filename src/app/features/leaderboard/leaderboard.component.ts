import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LeaderboardService } from 'src/app/core/services/leaderboard.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  allRecords: any;
  userRecords: any;
  allRecordsSubscription?: Subscription;
  userRecordsSubscription?: Subscription;
  user?: User;
  displayedColumns = ['position', 'user', 'flips', 'date'];
  button = '1';

  constructor(private auth: AuthService, private lb: LeaderboardService) {}

  ngOnInit(): void {
    this.getAllRecords();
    this.getUserRecords();
  }

  ngOnDestroy() {
    this.allRecordsSubscription?.unsubscribe();
    this.userRecordsSubscription?.unsubscribe();
  }

  getAllRecords() {
    this.lb.getAllRecords$().subscribe((data) => {
      this.lb.allRecords$.next(data.records);
      this.allRecordsSubscription = this.allRecordsSubscription =
        this.lb.allRecords$.subscribe(
          (allRecords) => (this.allRecords = allRecords)
        );
    });
  }

  getUserRecords() {
    this.userRecordsSubscription = this.lb.userRecords$.subscribe(
      (userRecords) => (this.userRecords = userRecords)
    );
  }
}
