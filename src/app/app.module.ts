import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { BoardComponent } from './components/board/board.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './shared/auth.guard';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { ContributionComponent } from './components/contribution/contribution.component';
import { FilesComponent } from './components/files/files.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssignmentComponent,
    BoardComponent,
    FileExplorerComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    NavbarComponent,
    NewBoardComponent,
    ContributionComponent,
    FilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [AuthGuard,{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '353669739270-do7tlbglagilmea6iid3l68081n3guei.apps.googleusercontent.com'
          ),
        }
      ],
    } as SocialAuthServiceConfig,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
