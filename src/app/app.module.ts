import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContributionModule } from "./components/contribution/contribution.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { FilesComponent } from "./components/files/files.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FooterModule } from "./components/footer/footer.module";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NewBoardComponent } from "./components/new-board/new-board.component";
import { ScrollToTopComponent } from "./components/scroll-to-top/scroll-to-top.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { VerifyCodeComponent } from "./components/verify-code/verify-code.component";
import { ClockComponent } from "./plugins/clock/clock.component";
import { AuthGuard } from "./shared/auth.guard";
import { FilterFolderPipe } from "./shared/filter-folder.pipe";

@NgModule({
  declarations: [
    AppComponent,
    // FooterComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    NavbarComponent,
    NewBoardComponent,
    FilesComponent,
    FilterFolderPipe,
    ClockComponent,
    ForgotPasswordComponent,
    VerifyCodeComponent,
    ScrollToTopComponent,
  ],
  imports: [
    ContributionModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPasswordStrengthModule,
    MatTooltipModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
