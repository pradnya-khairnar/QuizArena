import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.css'],
})
export class HostComponent implements OnInit, DoCheck {
  questionBank = [];
  count = 0;
  displayAns;
  timer;

  @Output('counter') counter: EventEmitter<number> = new EventEmitter<number>();

  constructor(private dataService: SharedDataService) {
    this.questionBank = dataService.questionBank;
    this.count = dataService.counter;
  }

  ngOnInit() {
    this.dataService.latestCount.subscribe({
      next: (count: number) => {
        this.count = count;
      },
    });
  }
  ngDoCheck() {
    this.dataService.coummunicateTime.subscribe((time) => {
      this.timer = time;
    });
  }

  onStart() {
    this.dataService.onStart();
  }
  onNext() {
    this.timer = 10;
    this.dataService.giveUpdatedTime(this.timer);
    this.dataService.onNext();
  }
  onFinish() {
    this.dataService.onFinish();
  }
  onShowAns() {
    this.dataService.onShowAns();
  }
}
