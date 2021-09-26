import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  questionBank = [];
  counter: number = 0;
  displayAns = false;
  timerInterval;
  timeLeft: number = 10;

  constructor(private dataService: SharedDataService) {
    this.questionBank = dataService.questionBank;
  }
  ngOnInit() {}

  timer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0 && this.timeLeft <= 10) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
      }
    }, 1000);
  }

  getCounter(event: number) {
    this.counter = event;
    this.timeLeft = 10;
    this.timer();
  }

  onShowAns(event: boolean) {
    this.displayAns = event;
  }

  onAnsClick(qi, ai) {
    this.dataService.onAnsClick(qi, ai);
  }
}
