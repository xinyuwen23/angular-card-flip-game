import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Card } from './card';
import { CARDS } from './cardset';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  title = 'CARD FLIP GAME';
  initCards: Card[] = CARDS.map((card) => ({
    ...card,
    flipped: false,
    matched: false,
  }));
  cards: Card[] = [];
  flipping: Card[] = [];
  matching = new Subject<Card[]>(); // temp store cards being flipped
  matchingSubscription!: Subscription;
  flippedCounter!: number;
  flipCounter!: number;
  messageSubject = new Subject<string>();
  message = '';

  ngOnInit() {
    this.handleInitCards();
    this.matchingSubscription = this.matching.subscribe((cards) => {
      this.handleMatching(cards);
    });
    this.messageSubject.subscribe((message) => (this.message = message));
    this.flipCounter = 0;
    this.flippedCounter = 0;
    this.messageSubject.next('Game begins');
  }

  ngOnDestroy() {
    this.matchingSubscription.unsubscribe();
  }

  reset() {
    this.ngOnDestroy();
    this.ngOnInit();
  }

  handleInitCards() {
    // randomly sort an array
    function shuffle(array: Array<Card>) {
      array.sort(() => Math.random() - 0.5);
    }
    // duplicate initCards
    const cards = [
      ...JSON.parse(JSON.stringify(this.initCards)),
      ...JSON.parse(JSON.stringify(this.initCards)),
    ];
    shuffle(cards);
    this.cards = cards;
  }

  flip(card: Card) {
    this.flipping.push(card);
    if (this.flipping.length >= 2) {
      this.flipCounter++;
      this.matching.next(this.flipping);
      this.flipping = [];
    } else {
      this.messageSubject.next('Pick another card');
    }
  }

  handleMatching(cards: Card[]) {
    function matched(card1: Card, card2: Card): boolean {
      if (card1.id === card2.id) return true;
      return false;
    }

    if (matched(cards[0], cards[1])) {
      this.messageSubject.next('Matched!');
      this.flippedCounter += 2;
      setTimeout(() => {
        cards[0].matched = true;
        cards[1].matched = true;
      }, 600);
      if (this.flippedCounter >= this.cards.length) {
        this.messageSubject.next('Congratulations!');
      }
    } else {
      this.messageSubject.next('NOT a match');
      setTimeout(() => {
        cards[0].flipped = false;
        cards[1].flipped = false;
      }, 1000);
    }
  }
}
