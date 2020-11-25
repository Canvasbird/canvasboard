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
  }
}
