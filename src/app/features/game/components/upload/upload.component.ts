import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  constructor(public game: GameService) {}

  ngOnInit(): void {}

  upload() {
    this.game.upload().subscribe((_) => console.log('Record submitted'));
  }
}
