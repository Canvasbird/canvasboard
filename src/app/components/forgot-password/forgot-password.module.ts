import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [CommonModule, ForgotPasswordRoutingModule],
  exports: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}
