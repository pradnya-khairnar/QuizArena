import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private socket: Socket) {}

  sendUserName(eventName: string, name) {
    this.socket.emit(eventName, name);
  }
  sendCount(eventName: string, count) {
    this.socket.emit(eventName, count);
  }
  sendTime(eventName: string, time) {
    this.socket.emit(eventName, time);
  }
  sendAns(eventName: string, ans) {
    this.socket.emit(eventName, ans);
  }
  nextQue(eventName: string) {
    this.socket.emit(eventName);
  }
  sendUsersCorrentAnsCount(eventName: string, name, ans) {
    this.socket.emit(eventName, name, ans);
  }
}
