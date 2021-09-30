import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, DoCheck {
  timer;
  counter = 0;
  questionBank = [];

  constructor(private dataService: SharedDataService) {
    // this.questionBank = dataService.questionBank;
    // this.counter = dataService.counter;
  }

  ngOnInit() {}
  ngDoCheck() {
    // this.dataService.coummunicateTime.subscribe((time) => {
    //   this.timer = time;
    // });
  }

  // onSubmit() {
  //   this.dataService.onSubmit();
  // }
}
