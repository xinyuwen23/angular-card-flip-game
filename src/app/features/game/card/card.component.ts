import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() card!: Card;
  @Output() clickCard = new EventEmitter();
  backLink = 'assets/images/svg-cards.svg#back';
  frontLink = '';

  constructor() {}

  ngOnInit(): void {
    this.frontLink = 'assets/images/svg-cards.svg#' + this.card.name;
  }

  flip() {
    if (!this.card.flipped) {
      this.card.flipped = true;
      this.clickCard.emit(this.card);
    }
  }
}
