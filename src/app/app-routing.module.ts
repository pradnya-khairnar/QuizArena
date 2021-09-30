import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HostComponent } from './host/host.component';
import { QueAnsComponent } from './que-ans/que-ans.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'host', component: QueAnsComponent },
  { path: 'users', component: QueAnsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
