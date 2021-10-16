import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/core/services/game.service';
import { LeaderboardService } from 'src/app/core/services/leaderboard.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit, OnDestroy {
  user: any;
  userSubscription?: Subscription;

  constructor(
    public game: GameService,
    private auth: AuthService,
    private lb: LeaderboardService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.auth.user$.subscribe(
      (user) => (this.user = user)
    );
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  upload() {
    this.game.upload$(this.user._id).subscribe(() => {
      this.lb
        .getUserRecords$(this.user._id)
        .subscribe((data) => this.lb.userRecords$.next(data.records));
    });
  }
}
