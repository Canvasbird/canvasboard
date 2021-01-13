import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {Router} from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { DailyQuote } from 'src/interfaces/daily-quote';
import { FilterFolderPipe } from 'src/app/shared/filter-folder.pipe';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterFolderPipe]
})
export class DashboardComponent implements OnInit {

  public quote: DailyQuote;
  constructor(private route: Router, private apiService: RestService, private filterFolder: FilterFolderPipe) {}

  data: any;
  Username: string = null;
  filterFolderName = '';

  ngOnInit() {
    this.gettingData();
    this.getQuote();
  }
  // GETTING USER DATA
  async gettingData() {
    const response = await this.apiService.getFoldersData();
    const data = await response.content;
    this.data = data.folders;
    this.Username = data.user_name;
    if (Object.keys(this.data).length === 0) {
      const noWorkspace = 'Please add a Workspace!';
      $('#user-folders').append(`<h5 id='not-found'>${noWorkspace}</h5>`);
    } else {
      this.addFolders(data);
    }
  }

  filterFolders() {
    if (this.filterFolderName === '' && Object.keys(this.data).length === 0) {
      $('#user-folders').html('');
      const noWorkspace = 'Please add a Workspace!';
      $('#user-folders').append(`<h5 id='not-found'>${noWorkspace}</h5>`);
    } else {
      $('#user-folders').html('');
      let folderNames: Array<string> = [];
      folderNames = this.filterFolder.transform(
        this.data,
        this.filterFolderName
      );
      const newData = {
        user_name: this.Username,
        folders: folderNames,
      };
      this.addFolders(newData);
    }
  }
  // ...............BLOCK BUILDING FUNCTION ......................
  addFolders(data) {
    if (Object.keys(data.folders).length === 0) {
      const notFound = 'No Workspace Found!';
      $('#user-folders').append(`<h5 id='not-found'>${notFound}</h5>`);
    } else {
      data.folders.forEach((obj) => {
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
      <div id=edit-name-input-${obj._id} style="display:none">
      <input
      class="folder-title" style= "margin-top:2.7em; margin-bottom:0.6em; border-color:transparent;
      width:55%; outline:none; border-radius:10em"
      id = new-name-text-${obj._id} value = "${obj.folder_name}" type="text"
      >
      <div style="display:inline-block;">
        <button style="border-style:none; outline: none; background-color:transparent" id=button-edit-name-ok-${obj._id}>
          <svg  width="1.5em" height="1.5em"  xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500">
            <circle style="fill:#32BA7C;" cx="253.6" cy="253.6" r="253.6"/>
            <path style="fill:#0AA06E;" d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"/>
              <path style="fill:#FFFFFF;" d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
                c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"/>
              <path style="fill:#FFFFFF;" d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
                c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"/>
          </svg>
        </button>
        <button style="border-style:none; outline: none; background-color:transparent" id=button-edit-name-no-${obj._id}>
          <svg  width="1.5em" height="1.5em"  xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 450 450">
            <circle style="fill:#E24C4B;" cx="227.556" cy="227.556" r="227.556"/>
            <path style="fill:#D1403F;" d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333
              c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222
              C422.4,91.022,455.111,155.022,455.111,227.556z"/>
            <path style="fill:#FFFFFF;" d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533
              c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533
              c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533
              c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533
              C339.911,308.622,339.911,322.844,331.378,331.378z"/>
          </svg>
          </button>
        </div>
        </div>
      <div style="display:flex">
      <h5 class="folder-title" id=folder-name-${obj._id}>
        <strong id=name-display-${obj._id}>${obj.folder_name}</strong>
      </h5>
      <button style="border-style:none; color:rgb(99, 64, 88); outline: none;
        margin-left:1rem;margin-top:2.5rem;background-color:transparent"
        id=button-edit-name-${obj._id}>
        <svg  width="0.8em" height="0.8em" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 388.947 388.947">
        <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 			"/>
          <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04
            C386.027,77.92,386.027,64.373,377.707,56.053z"/>
        </svg>
        </button>
      </div>
      <!-- <p class="folder-description">Lorem ipsum dolor sit amet.</p> -->
      <button class="btn btn-dark" id=button-${obj._id} title ="${obj.folder_name}">Enter</button>
    </div>
      `);

      // Click action to enter files folder
      $(`#button-${obj._id}`).click(() => {
        this.route.navigate([`/folder/${obj._id}`]);
      });
      // Click action to edit the folder_name
      $(`#button-edit-name-${obj._id}`).click(() => {
        const folderName = document.getElementById(`folder-name-${obj._id}`);
        const editText = document.getElementById(`edit-name-input-${obj._id}`);
        const editButton = document.getElementById(`button-edit-name-${obj._id}`);
        if (editText.style.display === 'block') {
          editText.style.display = 'none';
          folderName.style.display = 'block';
          editButton.style.display = 'block';

        } else {
          editText.style.display = 'block';
          folderName.style.display = 'none';
          editButton.style.display = 'none';
        }
      });
      // Click action to close the edit input
      $(`#button-edit-name-no-${obj._id}`).click(() => {
        const folderName = document.getElementById(`folder-name-${obj._id}`);
        const editText = document.getElementById(`edit-name-input-${obj._id}`);
        const editButton = document.getElementById(`button-edit-name-${obj._id}`);
        if (editText.style.display === 'block') {
          editText.style.display = 'none';
          folderName.style.display = 'block';
          editButton.style.display = 'block';
        }
        if (document.getElementById(`new-name-text-${obj._id}`).style.borderColor === 'red') {
          document.getElementById(`new-name-text-${obj._id}`).style.borderColor = 'transparent';
        }
      });
      // Click action to save the new edited name
      $(`#button-edit-name-ok-${obj._id}`).click(() => {
        const newName = (document.getElementById(`new-name-text-${obj._id}`) as HTMLInputElement).value;
        const folderName = document.getElementById(`folder-name-${obj._id}`);
        const editText = document.getElementById(`edit-name-input-${obj._id}`);
        const editButton = document.getElementById(`button-edit-name-${obj._id}`);
        if (newName === '') {      // If the new name is null then do not change the name.
          document.getElementById(`new-name-text-${obj._id}`).style.borderColor = 'red';
        } else {
          document.getElementById(`new-name-text-${obj._id}`).style.borderColor = 'transparent';
          this.renameFolder(obj, newName);
          if (editText.style.display === 'block') {
            editText.style.display = 'none';
            folderName.style.display = 'block';
            editButton.style.display = 'block';
          }
          this.data.find(x => x._id === obj._id).folder_name = newName;   // Changing the folder name in data variable that we used.
        }
      });
      // Open delete popup
      $(`#delete-${obj._id}`).click(() => {
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

  }

  navigateToFiles(e, item) {
    this.route.navigate(['/files']);
  }

  close() {
    document.getElementById('error-label').style.display = 'none';
  }

  async deleteCard(id) {
    const response = await this.apiService.deleteFolder(id);
    if (response.success) {
      // removing from array
      const index = this.data.findIndex((o) => {
        return o._id === id;
      });
      if (index !== -1) {
        this.data.splice(index, 1);
      }
      if (Object.keys(this.data).length === 0) {
        const noWorkspace = 'Please add a Workspace!';
        $('#user-folders').append(`<h5 id='not-found'>${noWorkspace}</h5>`);
      }

      // Removing from HTML
      document.getElementById(`${id}`).remove();
    }
  }

  addNewFolder(obj) {

    if (this.filterFolderName !== '') {
      this.filterFolderName = '';
      this.filterFolders();
    }
    if (Object.keys(this.data).length === 0) {
      $('#user-folders').html('');
    }
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
      <div id=edit-name-input-${obj._id} style="display:none">
      <input
      class="folder-title" style= "margin-top:2.7em; margin-bottom:0.6em; border-color:transparent;
      width:55%; outline:none; border-radius:10em"
      id = new-name-text-${obj._id} value = "${obj.folder_name}" type="text"
      >
      <div style="display:inline-block;">
        <button style="border-style:none; outline: none; background-color:transparent" id=button-edit-name-ok-${obj._id}>
          <svg  width="1.5em" height="1.5em"  xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500">
            <circle style="fill:#32BA7C;" cx="253.6" cy="253.6" r="253.6"/>
            <path style="fill:#0AA06E;" d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"/>
              <path style="fill:#FFFFFF;" d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
                c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"/>
              <path style="fill:#FFFFFF;" d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
                c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"/>
          </svg>
        </button>
        <button style="border-style:none; outline: none; background-color:transparent" id=button-edit-name-no-${obj._id}>
          <svg  width="1.5em" height="1.5em"  xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 450 450">
            <circle style="fill:#E24C4B;" cx="227.556" cy="227.556" r="227.556"/>
            <path style="fill:#D1403F;" d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,0-136.533-32.711-177.778-85.333
              c38.4,31.289,88.178,49.778,142.222,49.778c125.156,0,227.556-102.4,227.556-227.556c0-54.044-18.489-103.822-49.778-142.222
              C422.4,91.022,455.111,155.022,455.111,227.556z"/>
            <path style="fill:#FFFFFF;" d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,0l-72.533-72.533l-72.533,72.533
              c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,0-31.289l72.533-72.533l-72.533-72.533
              c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,22.756-8.533,31.289,0l72.533,72.533l72.533-72.533
              c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533
              C339.911,308.622,339.911,322.844,331.378,331.378z"/>
          </svg>
          </button>
        </div>
      </div>
      <div style="display:flex">
      <h5 class="folder-title" id=folder-name-${obj._id}>
        <strong id=name-display-${obj._id}>${obj.folder_name}</strong>
      </h5>
        <button style="border-style:none; color:rgb(99, 64, 88); outline: none;
        margin-left:1rem;margin-top:2.5rem;background-color:transparent"
        id=button-edit-name-${obj._id}>
        <svg  width="0.8em" height="0.8em" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 388.947 388.947">
        <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 			"/>
          <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04
            C386.027,77.92,386.027,64.373,377.707,56.053z"/>
        </svg>
        </button>
      </div>
  <!-- <p class="folder-description">Lorem ipsum dolor sit amet.</p> -->
  <button class="btn btn-dark" id=button-${obj._id} title ="${obj.folder_name}">Enter</button>
  </div>
    `);

    // Click action to enter files folder
    $(`#button-${obj._id}`).click(() => {
      this.route.navigate([`/folder/${obj._id}`]);
    });
    // Click action to edit the folder name.
    $(`#button-edit-name-${obj._id}`).click(() => {
      const folderName = document.getElementById(`folder-name-${obj._id}`);
      const editText = document.getElementById(`edit-name-input-${obj._id}`);
      const editButton = document.getElementById(`button-edit-name-${obj._id}`);
      if (editText.style.display === 'block') {
        editText.style.display = 'none';
        folderName.style.display = 'block';
        editButton.style.display = 'block';

      } else {
        editText.style.display = 'block';
        folderName.style.display = 'none';
        editButton.style.display = 'none';
      }
    });

    // Click action to close the edit input
    $(`#button-edit-name-no-${obj._id}`).click(() => {
      const folderName = document.getElementById(`folder-name-${obj._id}`);
      const editText = document.getElementById(`edit-name-input-${obj._id}`);
      const editButton = document.getElementById(`button-edit-name-${obj._id}`);
      if (editText.style.display === 'block') {
        editText.style.display = 'none';
        folderName.style.display = 'block';
        editButton.style.display = 'block';
      }
      if (document.getElementById(`new-name-text-${obj._id}`).style.borderColor === 'red') {
        document.getElementById(`new-name-text-${obj._id}`).style.borderColor = 'transparent';
      }
    });
    // Click action to save the new edited name
    $(`#button-edit-name-ok-${obj._id}`).click(() => {
      const newName = (document.getElementById(`new-name-text-${obj._id}`) as HTMLInputElement).value;
      const folderName = document.getElementById(`folder-name-${obj._id}`);
      const editText = document.getElementById(`edit-name-input-${obj._id}`);
      const editButton = document.getElementById(`button-edit-name-${obj._id}`);
      if (newName === '') {      // If the new name is null then do not change the name.
        document.getElementById(`new-name-text-${obj._id}`).style.borderColor = 'red';
      } else {
        document.getElementById(`new-name-text-${obj._id}`).style.borderColor = 'transparent';
        this.renameFolder(obj, newName);
        if (editText.style.display === 'block') {
          editText.style.display = 'none';
          folderName.style.display = 'block';
          editButton.style.display = 'block';
        }
        this.data.find(x => x._id === obj._id).folder_name = newName;     // Changing the folder name in data variable that we used.
      }
    });

    // Open delete popup
    $(`#delete-${obj._id}`).click(() => {
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
  }

  async createFolder() {
    const folderName: any = document.getElementById('folder-name-input');
    const folderdescription: any = document.getElementById('folder-description-input');
    const body = {
      folder_name: folderName.value,
      folder_title: folderdescription.value,
      folder_tag: 'folder_tag',
      is_nested_folder: false
    };
    const response = await this.apiService.createFolder(body);
    if (response.success) {
      // Error Label in popup
      document.getElementById('error-label').style.display = 'none';
      // Adding the folder in HTML
      this.addNewFolder(response.content);
      // Empty the strings
      folderName.value = '';
      folderdescription.value = '';
      // Closing popup
      $('#newCard').modal('hide');
    } else {
      // Error Label in popup
      document.getElementById('error-label').style.display = 'block';
    }
  }

  getQuote() {
    this.apiService.getDailyQuote()
      .then((quote: DailyQuote) => {
        this.quote = quote;
      })
      .catch((err) => {
        // Here we store a random dummyQuote to the quote property.
        this.quote = this.apiService.getDummyQuote();
      });
  }

  async renameFolder(obj, newName) {
    const body = {
      folder_name: newName,
      folder_title: obj.folder_title,
      folder_id: obj._id,
      folder_tag: obj.folder_tag,
      folder_color: 'folder_color',
      is_modified: true,
      is_pinned: false
    };
    const response = await this.apiService.renameFolder(body);
    if (response.success) {
      // Change the previous name of the folder in the display.
      const folderNameHeading = document.getElementById(`name-display-${obj._id}`);
      folderNameHeading.innerText = newName;
    } else {
      document.getElementById('error-label').style.display = 'block';
    }

  }
}
