import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from './scroll-to-top.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ScrollToTopComponent],
  imports: [CommonModule, BrowserModule, FormsModule],
  exports: [ScrollToTopComponent],
})
export class ScrollToTopModule {}
