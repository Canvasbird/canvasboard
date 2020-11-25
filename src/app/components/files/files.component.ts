import { Component, OnInit } from '@angular/core';
import {Data, Router, ActivatedRoute} from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

declare var $: any;
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  activateID: Data;
  data: any;
  FolderName: string = null;
  FolderDiscription: string = null;

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private apiService: RestService) {
    this.activatedRoute.params.subscribe( params => this.activateID = params );
  }

  ngOnInit() {
    this.gettingData(this.activateID.id);
  }

  // GETTING USER FILES
  async gettingData(id) {
    const response = await this.apiService.getFilesData(id);
    const data = await response.content;
    this.data = data;
    this.FolderName = this.data.folder_name;
    this.FolderDiscription = this.data.folder_title;
  }
}
