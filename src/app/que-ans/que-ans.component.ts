import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-que-ans',
  templateUrl: './que-ans.component.html',
  styleUrls: ['./que-ans.component.css'],
})
export class QueAnsComponent implements OnInit, OnDestroy, DoCheck {
  questionBank = [];
  counter = 0;
  displayAns = false;
  timerInterval;
  timeLeft: number = 10;

  constructor(private dataService: SharedDataService) {
    this.questionBank = dataService.questionBank;
    this.counter = dataService.counter;
  }

  ngOnInit() {
    this.dataService.latestCount.subscribe({
      next: (count: number) => {
        this.counter = count;
      },
    });
    this.timer();
  }
  ngDoCheck() {
    this.dataService.giveUpdatedTime(this.timeLeft);
    this.dataService.coummunicateTime.subscribe((time) => {
      this.timeLeft = time;
    });

    this.dataService.showAns.subscribe((ans) => {
      this.displayAns = ans;
    });
  }
  timer() {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0 && this.timeLeft <= 10) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
      }
    }, 1000);
  }

  onAnsClick(qi, ai) {
    this.dataService.onAnsClick(qi, ai);
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }
}
