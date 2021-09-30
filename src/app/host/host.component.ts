import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SharedDataService } from '../services/shared-data.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
})
export class HostComponent implements OnInit, DoCheck {
  questionBank = [];
  displayAns;
  count = 0;
  timer = 0;

  @Output('counter') counter: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private dataService: SharedDataService // private webSocketService: WebSocketService,
  ) // private socket: Socket
  {
    this.questionBank = dataService.questionBank;
    this.count = dataService.counter;
  }

  ngOnInit() {
    // this.webSocketService.sendCountTime('CountAndTime', { count: 0, time: 10 });
    // this.socket.on('CountAndTime', (data) => {
    //   console.log('data from server', data.count, data.time);
    // });
    // this.dataService.latestCount.subscribe({
    //   next: (count: number) => {
    //     this.count = count;
    //   },
    // });
  }
  ngDoCheck() {
    // this.dataService.coummunicateTime.subscribe((time) => {
    //   this.timer = time;
    // });
  }

  // onStart() {
  //   this.dataService.onStart();
  // }
  // onNext() {
  //   this.timer = 10;
  //   this.dataService.giveUpdatedTime(this.timer);
  //   this.dataService.onNext();
  // }
  // onFinish() {
  //   this.dataService.onFinish();
  // }
  // onShowAns() {
  //   this.dataService.onShowAns();
  // }
}
