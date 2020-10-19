import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent} from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {FileExplorerComponent} from './components/file-explorer/file-explorer.component';
import { BoardComponent } from './components/board/board.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { SubmissionComponent } from './components/submission/submission.component';

// guard
import { AuthGuard } from './shared/auth.guard'
import { NewBoardComponent } from './components/new-board/new-board.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { SubjectDashboardComponent } from './components/subject-dashboard/subject-dashboard.component';
import { ContributionComponent } from './components/contribution/contribution.component';
import { FilesComponent } from './components/files/files.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'contribution',
    component: ContributionComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'file-explorer',
    component: FileExplorerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'board',
    component: BoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'files',
    component: FilesComponent,
  },
  {
    path: 'assignment',
    component: AssignmentComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'submission',
    component: SubmissionComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'creative-board',
    component: NewBoardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subject',
    component: SubjectDashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
