import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/core/services/game.service';
import { LeaderboardService } from 'src/app/core/services/leaderboard.service';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  user: any;

  constructor(
    public game: GameService,
    private auth: AuthService,
    private lb: LeaderboardService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.user = this.auth.user$.getValue();
  }

  upload() {
    this.game.upload$(this.user._id).subscribe(() => {
      this.lb.getUserRecords$(this.user._id).subscribe((data) => {
        this.lb.userRecords$.next(data.records);
        this.message.openSnackBar('Record submitted', 'Awesome!');
      });
    });
  }
}
