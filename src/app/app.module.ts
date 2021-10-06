import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollToTopModule } from './components/scroll-to-top/scroll-to-top.module';
import { AuthGuard } from './shared/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ScrollToTopModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
