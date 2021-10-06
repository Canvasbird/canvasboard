import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock.component';
import { ClockRoutingModule } from './clock-routing.module';

@NgModule({
  declarations: [ClockComponent],
  imports: [CommonModule, ClockRoutingModule],
  exports: [ClockComponent],
})
export class ClockModule {}
