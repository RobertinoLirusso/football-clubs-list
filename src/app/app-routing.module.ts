import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ClubListComponent } from './club-list/club-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Football Clubs List',
    children: [
      {path: '', component: ClubListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
