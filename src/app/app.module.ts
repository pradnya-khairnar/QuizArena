import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QueAnsComponent } from './que-ans/que-ans.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgpSortModule } from 'ngp-sort-pipe';

const config: SocketIoConfig = { url: 'http://localhost:4201', options: {} };
@NgModule({
  declarations: [AppComponent, QueAnsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    NgpSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
