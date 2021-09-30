import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedUrl;
  constructor(private router: Router) {
    this.router.events.subscribe((res) => {
      this.loadedUrl = this.router.url;
    });
  }
  ngOnInit() {}
}
