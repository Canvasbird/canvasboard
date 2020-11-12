import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Data } from 'src/interfaces/dashboard';
import { RestService } from 'src/app/services/rest.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private route: Router, private apiService: RestService) { }

  data: any;

  ngOnInit() {
    this.gettingData();
  }

  async gettingData() {
    const response = await this.apiService.getFoldersData();
    this.data = response.content;
    console.log(this.data);
    
  }

  navigateToFiles(e, item) {
    console.log('Working', item);
    this.route.navigate(['/files']);
  }

  close() {
    document.getElementById('error-label').style.display = 'none';
  }

  deleteCard(id) {
    console.log(id);
    
    
  }

  async createFolder() {
    const folderName: any = document.getElementById('folder-name-input');
    const folderDiscription: any = document.getElementById('folder-discription-input');
    const body = {
      folder_name: folderName.value,
      folder_title: folderDiscription.value,
      folder_tag: 'folder_tag',
      is_nested_folder: false
    };
    const response = await this.apiService.createFolder(body);
    if (response.success) {
      document.getElementById('error-label').style.display = 'none';
      $('#newCard').modal('hide');
    } else {
      document.getElementById('error-label').style.display = 'block';
    }
  }
}
