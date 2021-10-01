import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-que-ans',
  templateUrl: './que-ans.component.html',
  styleUrls: ['./que-ans.component.css'],
})
export class QueAnsComponent implements OnInit, DoCheck {
  questionBank = [];
  loadedUrl: string;
  counter: number = 0;
  timer: number = 10;
  displayAns: boolean = false;
  stopTimer: boolean = false;
  ansStatus: boolean = false;
  currentQues = {
    ans: null,
    correct: null,
  };
  userAns = null;

  constructor(
    private router: Router,
    private dataService: SharedDataService,
    private socket: Socket
  ) {
    this.router.events.subscribe((res) => {
      this.loadedUrl = this.router.url;
    });
    this.questionBank = dataService.questionBank;
    this.counter = dataService.counter;
  }

  ngOnInit() {
    if (this.loadedUrl === '/users') {
      this.socket.on('next', () => {
        this.userAns = null;
      });
    }
    this.socket.on('count', (count) => {
      this.counter = count;
    });
    this.socket.on('ans', (ans) => {
      this.displayAns = ans;
    });
  }
  ngDoCheck() {
    if (this.timer > 0) {
      this.socket.on('time', (time) => {
        this.timer = time;
      });
    }
  }

  onStart() {
    this.dataService.onStart();
  }
  onNext() {
    this.dataService.onNext();
  }
  onFinish() {
    this.dataService.onFinish();
  }
  onShowAns() {
    this.dataService.onShowAns();
  }
  onSubmit() {
    this.compareAns();
  }
  onAnsClick(qi, ai) {
    this.currentQues = this.questionBank[qi];
    this.userAns = this.currentQues.ans ? this.currentQues.ans[ai] : null;
  }
  compareAns() {
    if (this.currentQues.correct && this.currentQues.correct === this.userAns) {
      this.ansStatus = true;
    } else {
      this.ansStatus = false;
    }
  }
}
