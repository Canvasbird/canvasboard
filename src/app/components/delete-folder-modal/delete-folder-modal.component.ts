import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-folder-modal',
  templateUrl: './delete-folder-modal.component.html',
  styleUrls: ['./delete-folder-modal.component.scss']
})
export class DeleteFolderModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
