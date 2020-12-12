import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  xAuthToken = null;
  boardId = null;
  gerBoardDetails = null;
  createFolderResponse = null;
  deleteFolderResponse = null;
  renameFolderResponse = null;

  getFilesDetails = null;

  constructor(private http: HttpClient, public router: Router) {}

  saveBoardData(boardTitle, boardData) {
    this.xAuthToken = localStorage.getItem('token');
    const body = {
      board_name: boardTitle,
      board_data: boardData
    };
    this.http.post(environment.apiHost + '/api/v1/user/save/board', body, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).subscribe( res => {
      console.log(res);
      this.boardId = JSON.parse(JSON.stringify(res)).board_id;

      // this.getBoardData(this.boardId)
    });

    console.log(this.boardId, 'THIS ');

  }

  getBoardData(boardId) {
    console.log('Inside get', this.boardId);

    this.xAuthToken = localStorage.getItem('token');
    this.http.get(environment.apiHost + `/api/v1/user/get/board?board_id=${boardId}`, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).subscribe( res => {
        console.log(res);
    });
  }

  // ........................... DASHBOARD APIS........................................

  // ........................... GET FOLDERS...........................................
  async getFoldersData() {
    this.xAuthToken = localStorage.getItem('token');
    await this.http.get(`https://api.canvasboard.live/api/v1/user/view-folders/`, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).toPromise()
    .then((response) => {
      this.gerBoardDetails = response;
    });
    return this.gerBoardDetails;
  }
  // ........................... CREATE FOLDER ........................................
  async createFolder(body) {
    this.xAuthToken = localStorage.getItem('token');
    await this.http.post(`https://api.canvasboard.live/api/v1/user/create-folder`, body, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).toPromise()
    .then((response) => {
      this.createFolderResponse = response;
    });
    return this.createFolderResponse;
  }
  // ........................... DELETE FOLDER ........................................
  async deleteFolder(value) {
    this.xAuthToken = localStorage.getItem('token');
    await this.http.delete(`https://api.canvasboard.live/api/v1/user/remove-folder?folder_id=${value}`, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).toPromise()
    .then((response) => {
      this.deleteFolderResponse = response;
    });
    return this.deleteFolderResponse;
  }
  // ........................... UPDATE FOLDER ........................................
  async renameFolder(body) {
    this.xAuthToken = localStorage.getItem('token');
    await this.http.post(`https://api.canvasboard.live/api/v1/user/rename-folder`, body, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).toPromise()
    .then((response) => {
      console.log(body);
      this.renameFolderResponse = response;
    });
    return this.renameFolderResponse;
  }
  // ........................... FILES APIS........................................

  // ........................... GET FILES........................................
  async getFilesData(id) {
    this.xAuthToken = localStorage.getItem('token');
    await this.http.get(`https://api.canvasboard.live/api/v1/user/folder/files/${id}`, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).toPromise()
    .then((response) => {
      this.getFilesDetails = response;
    });
    return this.getFilesDetails;
  }
}
