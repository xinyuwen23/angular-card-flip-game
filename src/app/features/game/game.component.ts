import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';
import { CARDS } from './data/cards';
import { Card } from './interfaces/card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cards: Card[] = [];
  flipping: Card[] = [];
  matching: Card[] = [];
  flippedCounter: number = 0;
  flippingCounter: number = 0;
  message: string = '';

  constructor(private game: GameService) {}

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.cards = this.getNewCards();
    this.flipping = [];
    this.matching = [];
    this.flippedCounter = 0;
    this.flippingCounter = 0;
    this.message = 'Game begins';
  }

  getNewCards(): Card[] {
    let cards: Card[] = this.createInitCards(CARDS);
    cards = this.doubleCards(cards);
    cards = this.shuffleCards(cards);
    return cards;
  }

  createInitCards(cards: any): Card[] {
    return cards.map((card: any) => ({
      ...card,
      flipped: false,
      matched: false,
    }));
  }

  doubleCards(cards: Card[]) {
    return [
      ...JSON.parse(JSON.stringify(cards)),
      ...JSON.parse(JSON.stringify(cards)),
    ];
  }

  shuffleCards(cards: Card[]) {
    return cards.sort(() => Math.random() - 0.5);
  }

  flip(card: Card) {
    this.flipping.push(card);
    if (this.flipping.length >= 2) {
      this.flippingCounter++;
      this.matching = this.flipping;
      this.flipping = [];
      this.handleMatching(this.matching);
    } else {
      this.message = 'Pick another card';
    }
  }

  handleMatching(cards: Card[]) {
    if (this.matched(cards[0], cards[1])) {
      this.message = 'Matched!';
      this.flippedCounter += 2;
      setTimeout(() => {
        cards[0].matched = true;
        cards[1].matched = true;
      }, 600);
      if (this.flippedCounter >= this.cards.length) {
        this.message = 'Congratulations!';
        this.game.flips = this.flippingCounter;
        this.game.openUploadDialog();
      }
    } else {
      this.message = 'NOT a match';
      setTimeout(() => {
        cards[0].flipped = false;
        cards[1].flipped = false;
      }, 1000);
    }
  }

  matched(card1: Card, card2: Card): boolean {
    if (card1.id === card2.id) return true;
    return false;
  }
}
