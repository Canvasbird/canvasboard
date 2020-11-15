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
    const data = await response.content;
    this.data = data;
    this.addFolders(data);
  }

  // ...............BLOCK BUILDING FUNCTION ......................
  addFolders(data) {
    data.forEach((obj) => {
      console.log(obj);
      // Add Folders
      $('#user-folders').append(`
      <div class="folder-box shadow" id=${obj._id}>
      <div class="icons-box">
        <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-folder2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958
           0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5
           1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5
           0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"/>
        </svg>

        <svg id=delete-${obj._id} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg" style="float: right;">
          <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1
          1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5
          0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8
          5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
        </svg>
        <div id=delete-sure-${obj._id} class="delete-popup" (click)="deleteCard(data._id)">
          <button class="btn btn-outline-danger">Sure?</button>
        </div>
      </div>
      <h5 class="folder-title"><strong>${obj.folder_name}</strong></h5>
      <!-- <p class="folder-discription">Lorem ipsum dolor sit amet.</p> -->
      <button class="btn btn-dark" id=button-${obj._id}>Enter</button>
    </div>
      `);

    // Click action to enter files folder
      $(`#button-${obj._id}`).click( () => {
        this.route.navigate([`/folder/${obj._id}`]);
      });

    // Open delete popup
      $(`#delete-${obj._id}`).click( () => {
      const popup = document.getElementById(`delete-sure-${obj._id}`);
      if (popup.style.display === 'block') {
        popup.style.display = 'none';
      } else {
        popup.style.display = 'block';
      }
    });

    // Delete sure popup
      $(`#delete-sure-${obj._id}`).click(() => {
      this.deleteCard(obj._id);
    });

    });

  }


  navigateToFiles(e, item) {
    console.log('Working', item);
    this.route.navigate(['/files']);
  }

  close() {
    document.getElementById('error-label').style.display = 'none';
  }

  async deleteCard(id) {
    console.log(id);
    const response = await this.apiService.deleteFolder(id);
    console.log(response);
    if (response.success) {
      // removing from array
      const index = this.data.findIndex((o) => {
        return o.id === 'myid';
      });
      if (index !== -1) {
        this.data.splice(index, 1);
      }

      // Removing from HTML
      document.getElementById(`${id}`).remove();
    }
  }

  addNewFolder(obj) {
    $('#user-folders').append(`
    <div class="folder-box shadow" id=${obj._id}>
    <div class="icons-box">
      <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-folder2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958
         0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5
         1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5
         0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"/>
      </svg>

      <svg id=delete-${obj._id} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor"
       xmlns="http://www.w3.org/2000/svg" style="float: right;">
        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1
        1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5
        0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8
        5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
      </svg>
      <div id=delete-sure-${obj._id} class="delete-popup" (click)="deleteCard(data._id)">
        <button class="btn btn-outline-danger">Sure?</button>
      </div>
    </div>
    <h5 class="folder-title"><strong>${obj.folder_name}</strong></h5>
    <!-- <p class="folder-discription">Lorem ipsum dolor sit amet.</p> -->
    <button class="btn btn-dark" id=button-${obj._id}>Enter</button>
  </div>
    `);

    // Click action to enter files folder
    $(`#button-${obj._id}`).click( () => {
        this.route.navigate([`/folder/${obj._id}`]);
    });

    // Open delete popup
    $(`#delete-${obj._id}`).click( () => {
      const popup = document.getElementById(`delete-sure-${obj._id}`);
      if (popup.style.display === 'block') {
        popup.style.display = 'none';
      } else {
        popup.style.display = 'block';
      }
    });

    // Delete sure popup
    $(`#delete-sure-${obj._id}`).click(() => {
      this.deleteCard(obj._id);
    });

    // Push it to data array
    this.data.push(obj);
    console.log(this.data);
    
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
      // Error Label in popup
      document.getElementById('error-label').style.display = 'none';
      // Adding the folder in HTML
      this.addNewFolder(response.content);
      // Closing popup
      $('#newCard').modal('hide');
    } else {
      // Error Label in popup
      document.getElementById('error-label').style.display = 'block';
    }
  }
}
