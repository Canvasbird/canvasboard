import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// guard
import { AuthGuard, LoginGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'contribution',
    loadChildren: () =>
      import('./components/contribution/contribution.module').then(
        (m) => m.ContributionModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./components/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('./components/verify-code/verify-code.module').then(
        (m) => m.VerifyCodeModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./components/sign-up/sign-up.module').then((m) => m.SignUpModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'plugins/clock',
    loadChildren: () =>
      import('./plugins/clock/clock.module').then((m) => m.ClockModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'folder',
    loadChildren: () =>
      import('./components/files/files.module').then((m) => m.FilesModule),
  },
  {
    path: 'board',
    loadChildren: () =>
      import('./components/new-board/new-board.module').then(
        (m) => m.NewBoardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
