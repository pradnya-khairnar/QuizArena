import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HostComponent } from './host/host.component';
import { UsersComponent } from './users/users.component';
import { QueAnsComponent } from './que-ans/que-ans.component';

@NgModule({
  declarations: [
    AppComponent,
    HostComponent,
    UsersComponent,
    QueAnsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
