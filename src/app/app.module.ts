import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteFolderModalComponent } from './components/delete-folder-modal/delete-folder-modal.component';
import { ScrollToTopModule } from './components/scroll-to-top/scroll-to-top.module';
import { AuthGuard } from './shared/auth.guard';

@NgModule({
    declarations: [AppComponent, DeleteFolderModalComponent],
    imports: [
        ScrollToTopModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
