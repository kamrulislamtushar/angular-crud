import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component'; 
import { RegisterComponent } from 'src/app/register/register.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { ViewMemberComponent } from 'src/app/view-member/view-member.component';
import { AddMemberComponent } from 'src/app/add-member/add-member.component';
import {PlayGameComponent} from "./play-game/play-game.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'players/:id',      component: ViewMemberComponent},
  { path: 'players-create',      component: AddMemberComponent},
  { path: 'game', component: PlayGameComponent},

  // otherwise redirect to home
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
