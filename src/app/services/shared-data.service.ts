import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService implements OnDestroy {
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
  counter: number = 0;
  timer: number = 10;
  timerInterval;
  displayAns = false;
  ansStatus;
  ques;
  ans;

  constructor(private webSocketService: WebSocketService) {}

  onStart() {
    this.counter++;
    this.webSocketService.sendCount('count', this.counter);
    this.startTimer();
  }
  onNext() {
    this.counter++;
    this.webSocketService.sendCount('count', this.counter);
    this.displayAns = false;
    this.webSocketService.sendAns('ans', this.displayAns);
    this.timer = 10;
    this.startTimer();
  }
  onFinish() {
    this.counter = this.questionBank.length + 1;
    this.webSocketService.sendCount('count', this.counter);
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
    this.webSocketService.sendAns('ans', this.displayAns);
    this.compareAns();
  }
  compareAns() {
    if (this.ques.correct === this.ans) {
      this.ansStatus = true;
    } else {
      this.ansStatus = false;
    }
  }
  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0 && this.timer <= 10) {
        this.timer--;
        this.webSocketService.sendCount('time', this.timer);
      } else {
        this.timer = 0;
      }
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }
}
