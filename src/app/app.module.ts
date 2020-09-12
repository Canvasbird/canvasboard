import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BoardComponent } from './components/board/board.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './shared/auth.guard';
import { SubjectDashboardComponent } from './components/subject-dashboard/subject-dashboard.component';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    FileExplorerComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    NavbarComponent,
    SubjectDashboardComponent,
    NewBoardComponent,
    UserDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
