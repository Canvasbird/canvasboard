import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';
import { NewBoardRoutingModule } from './new-board-routing.module';
import { NewBoardComponent } from './new-board.component';

@NgModule({
  declarations: [NewBoardComponent],
  imports: [CommonModule, NavbarModule, FormsModule, NewBoardRoutingModule],
  exports: [NewBoardComponent],
})
export class NewBoardModule {}
