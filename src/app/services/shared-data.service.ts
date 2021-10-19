import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService implements OnDestroy {
  questionBank = [
    {
      id: 1,
      que: 'What would you do to make your password difficult to guess?',
      ans: [
        'Set it complex enough',
        'User similar old password',
        'Use your name & birth date',
        'User generic terms & numeric sequennces',
      ],
      correct: 'Set it complex enough',
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
  timerIntervalId;
  displayAns = false;

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
    clearInterval(this.timerIntervalId);
    this.timer = 10;
    this.startTimer();
    this.webSocketService.nextQue('next');
  }
  onFinish() {
    this.counter = this.questionBank.length + 1;
    this.webSocketService.sendCount('count', this.counter);
    this.webSocketService.nextQue('next');
  }

  onShowAns() {
    this.displayAns = true;
    this.webSocketService.sendAns('ans', this.displayAns);
    console.log('show ans', this.displayAns);
  }

  startTimer() {
    this.timerIntervalId = setInterval(() => {
      if (this.timer > 0 && this.timer <= 10) {
        this.timer--;
        this.webSocketService.sendCount('time', this.timer);
      } else {
        this.timer = 0;
      }
    }, 1000);
  }
  ngOnDestroy() {
    clearInterval(this.timerIntervalId);
  }
}
