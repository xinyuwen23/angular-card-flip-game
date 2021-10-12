import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
  declarations: [GameComponent, CardComponent, UploadComponent],
  imports: [CommonModule, GameRoutingModule, SharedModule],
})
export class GameModule {}
