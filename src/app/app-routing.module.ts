import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HostComponent } from './host/host.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'host', component: HostComponent },
  { path: 'user', component: UsersComponent },
  { path: '**', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
