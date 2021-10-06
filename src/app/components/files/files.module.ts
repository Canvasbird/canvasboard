import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FilesRoutingModule } from './files-routing.module';

@NgModule({
  declarations: [FilesComponent],
  imports: [CommonModule, NavbarModule, FilesRoutingModule],
  exports: [FilesComponent],
})
export class FilesModule {}
