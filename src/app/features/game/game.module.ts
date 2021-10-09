import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GameComponent, CardComponent],
  imports: [CommonModule, GameRoutingModule, SharedModule],
})
export class GameModule {}
