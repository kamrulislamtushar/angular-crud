import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component'; 
import { RegisterComponent } from 'src/app/register/register.component';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';
import { ViewMemberComponent } from 'src/app/view-member/view-member.component';
import { AddMemberComponent } from 'src/app/add-member/add-member.component';
import { EditMemberComponent } from 'src/app/edit-member/edit-member.component';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'members/:id',      component: ViewMemberComponent, canActivate: [AuthGuard] },
  { path: 'members-create',      component: AddMemberComponent, canActivate: [AuthGuard],  data: { roles: [Role.Admin] } },
  { path: 'members-edit/:id',      component: EditMemberComponent, canActivate: [AuthGuard],  data: { roles: [Role.Admin] } },

  // otherwise redirect to home
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
