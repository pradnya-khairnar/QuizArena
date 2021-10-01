import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueAnsComponent } from './que-ans/que-ans.component';

const routes: Routes = [
  { path: 'host', component: QueAnsComponent },
  { path: 'users', component: QueAnsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
