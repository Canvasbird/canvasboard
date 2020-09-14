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

    console.log(this.boardId,"THIS ");

  }

  getBoardData(boardId) {
    console.log("Inside get",this.boardId);

    this.xAuthToken = localStorage.getItem('token');
    this.http.get(environment.apiHost + `/api/v1/user/get/board?board_id=${boardId}`, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).subscribe( res => {
        console.log(res);
    });
  }
}
