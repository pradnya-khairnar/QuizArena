import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  questionBank = [
    {
      id: 1,
      que: 'Who is PM of India?',
      ans: ['Modi', 'Trump', 'Shaha', 'None'],
      correct: 'Modi',
      counter: 1,
    },
    {
      id: 2,
      que: 'How many colors in National Flag?',
      ans: ['2', '6', '4', '3'],
      correct: '3',
      counter: 2,
    },
    {
      id: 3,
      que: 'What is national game?',
      ans: ['Cricket', 'Hockey', 'Basket Ball', 'Chess'],
      correct: 'Hockey',
      counter: 3,
    },
  ];
  ansStatus;
  ques;
  ans;
  counter = 0;
  displayAns = false;

  showAns = new Subject<boolean>();
  latestCount = new Subject();
  coummunicateTime = new Subject<number>();
  constructor() {}

  onStart() {
    this.counter++;
    this.latestCount.next(this.counter);
  }

  onNext() {
    this.counter++;
    this.latestCount.next(this.counter);

    this.displayAns = false;
    this.showAns.next(this.displayAns);
  }

  onFinish() {
    this.counter = this.questionBank.length + 1;
    this.latestCount.next(this.counter);
  }

  onAnsClick(qi, ai) {
    this.ques = this.questionBank[qi];
    this.ans = this.ques.ans[ai];
  }

  onSubmit() {
    console.log(this.ques.que, this.ans);
  }
  onShowAns() {
    this.displayAns = true;
    this.showAns.next(this.displayAns);
    this.compareAns();
  }
  compareAns() {
    if (this.ques.correct === this.ans) {
      this.ansStatus = true;
    } else {
      this.ansStatus = false;
    }
  }
  giveUpdatedTime(time) {
    if (time >= 0) {
      this.coummunicateTime.next(time);
    }
  }
}
