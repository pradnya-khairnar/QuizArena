import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { SharedDataService } from '../services/shared-data.service';
import { WebSocketService } from '../services/web-socket.service';

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
  usersData = {};
  usersList = [];
  userName: string = '';
  userCorrectAnsCount = 0;
  hideUserInput = false;
  userExists = false;
  uname: string;

  constructor(
    private router: Router,
    private dataService: SharedDataService,
    private webSocketService: WebSocketService,
    private socket: Socket
  ) {
    this.router.events.subscribe((res) => {
      this.loadedUrl = this.router.url;
    });
    this.questionBank = dataService.questionBank;
    this.counter = dataService.counter;
  }

  ngOnInit() {
    this.socket.on('sendUserName', (name) => {
      console.log('>name>', name, this.uname);
      if (this.usersData[name] === undefined) {
        this.userName;
        this.usersData[name] = 0;
        this.usersList = Object.keys(this.usersData);
        this.uname = undefined;
      } else {
        this.userExists = true;
        this.hideUserInput = false;
        console.log('user name exists');
      }
    });
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
    this.socket.on('correctAnsCount', (name, ansCount) => {
      this.usersData[name] = ansCount;
      this.usersList = Object.entries(this.usersData);
      console.log('user, count...', this.userName, ansCount);
    });
  }
  ngDoCheck() {
    if (this.timer > 0) {
      this.socket.on('time', (time) => {
        this.timer = time;
      });
    }
  }

  sendUserName(event: any) {
    this.hideUserInput = true;
    this.userName = event.value;
    this.uname = event.value;
    this.webSocketService.sendUserName('sendUserName', this.userName);
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
  onSubmitAns() {
    this.compareAns();
  }
  onAnsClick(qi, ai) {
    this.currentQues = this.questionBank[qi];
    this.userAns = this.currentQues.ans ? this.currentQues.ans[ai] : null;
  }
  compareAns() {
    if (this.currentQues.correct && this.currentQues.correct === this.userAns) {
      this.ansStatus = true;
      this.userCorrectAnsCount++;
    } else {
      this.ansStatus = false;
    }
    this.webSocketService.sendUsersCorrentAnsCount(
      'correctAnsCount',
      this.userName,
      this.userCorrectAnsCount
    );
  }
}
