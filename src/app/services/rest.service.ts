import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DailyQuote } from 'src/interfaces/daily-quote';
import { NewBoard } from 'src/interfaces/new-board';
import Swal from 'sweetalert2';
import { TwitterData } from 'src/interfaces/twitterData';
import { ConstantPool } from '@angular/compiler';
import { Content } from '@angular/compiler/src/render3/r3_ast';

declare var $: any;
@Injectable({
  providedIn: 'root'
})


export class RestService {

  xAuthToken = null;
  boardId = null;
  viewFolderResponse = null;
  createFolderResponse = null;
  deleteFolderResponse = null;
  renameFolderResponse = null;
  createFileResponse = null;
  viewFileResponse = null;
  deleteFileResponse = null;
  renameFileResponse = null;
  getFilesDetails = null;
  resetPasswordEmailResponse = null;
  newPasswordResponse = null;
  dummyQuote: DailyQuote[] = [];
  getTwitterResponse = null;


  constructor(private http: HttpClient, public router: Router) { }


  // ........................... FILE APIS........................................

  // ........................... CREATE FILE ........................................
  async createBoardData(boardData): Promise<NewBoard> {
    this.xAuthToken = localStorage.getItem('token');
    const body = boardData;
    await this.http.post('https://api.canvasboard.live/api/v1/user/folder/create-file', body, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).toPromise()
      .then((response) => {
        // this.boardId = JSON.parse(JSON.stringify(res)).board_id;
        this.createFileResponse = JSON.parse(JSON.stringify(response)).file;
      });
    return this.createFileResponse;

  }
  // ........................... UPDATE FILE ........................................

  async saveBoardData(boardData) {
    this.xAuthToken = localStorage.getItem('token');
    const body = boardData;
    await this.http.post('https://api.canvasboard.live/api/v1/user/folder/edit-file', body, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).toPromise()
      .then((response) => {
      });
  }

  // ........................... GET FILE...........................................

  async getBoardData(boardId) {
    this.xAuthToken = localStorage.getItem('token');
    await this.http.get(`https://api.canvasboard.live/api/v1/user/files/${boardId}`, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).toPromise()
      .then((response) => {
        this.viewFileResponse = response;
      });
    return this.viewFileResponse;

  }

  // ........................... DELETE File ........................................
  async deleteFile(folderId, fileId) {
    this.xAuthToken = localStorage.getItem('token');
    await this.http.delete(`https://api.canvasboard.live/api/v1/user/folder/remove-file?folder_id=${folderId}&file_id=${fileId}`, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).toPromise()
      .then((response) => {
        this.deleteFileResponse = response;
      });
    return this.deleteFileResponse;
  }
  // ........................... RENAME FILE ........................................
  async renameFile(body) {
    this.xAuthToken = localStorage.getItem('token');
    await this.http.post(`https://api.canvasboard.live/api/v1/user/folder/rename-file`, body, {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': this.xAuthToken
      })
    }).toPromise()
      .then((response) => {
        this.renameFileResponse = response;
      });
    return this.renameFileResponse;
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
        this.viewFolderResponse = response;
      });
    return this.viewFolderResponse;
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
  // .........................DAILY QUOTES API...................................
  getDailyQuote() {
    return this.http.get('https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote', {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type,Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials': 'true',
        'x-rapidapi-key': '318ed0c148msh279b4a7589d2c18p1db725jsnaa114ac4aa88',
        'x-rapidapi-host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com',
        useQueryString: 'true'
      })
    }).toPromise();
  }
  getDummyQuote() {
    // We need this Dummy Quotes when the API would not get a response
    this.dummyQuote = [{
      author: 'Nelson Mandela',
      text: 'It always seems impossible until its done.'
    },
    {
      author: 'Dalai Lama',
      text: 'Be kind whenever possible.It is always possible.'
    },
    {
      author: 'Walt Disney',
      text: 'If you can dream it, you can do it.'
    },
    {
      author: 'Elon Musk',
      text: 'When something is important enough, you do it even if the odds are not in you favour.'
    },
    {
      author: 'Walt Disney',
      text: 'If you can dream it, you can do it.'
    }];

    // This function get a random number within the range of the length of the dailyQuote array.
    function randomQuote(min: number, max: number) {
      // return Math.floor(Math.random() * (max - min) + min);
      // Create byte array and fill with 1 random number
      const byteArray = new Uint8Array(1);
      window.crypto.getRandomValues(byteArray);

      const range = max - min + 1;
      const maxRange = 256;
      if (byteArray[0] >= Math.floor(maxRange / range) * range) {
        return randomQuote(min, max);
      }
      return min + (byteArray[0] % range);
    }
    // This returns one key-value pair from the array of objects
    return this.dummyQuote[randomQuote(0, 5)];
  }

  // ...................... FORGOT PASSWORD.....................................
  async sendEmailAddressForReset(body) {
    try {
      await this.http.post(`https://api.canvasboard.live/api/v1/forget`, body).toPromise()
        .then((response) => {
          this.resetPasswordEmailResponse = response;
        });
      return this.resetPasswordEmailResponse;

    } catch (err) {
      Swal.fire({ icon: 'error', text: 'Something went wrong! Please try again. ' });
    }
  }

  // ....................... SEND NEW PASSWORD DETAILS ...................................
  async sendNewPasswordDetails(body) {
    try {
      await this.http.post(`https://api.canvasboard.live/api/v1/reset`, body).toPromise()
        .then((response) => {
          this.newPasswordResponse = response;
        });
      return this.newPasswordResponse;

    } catch (err) {
      Swal.fire({ icon: 'error', text: 'Something went wrong! Please try again. ' });
    }
  }

  // ........................... GET TWITTER EMBED........................................
  async getTweet(tweetUrl) {
    // this.xAuthToken = localStorage.getItem('token');
    this.getTwitterResponse  = await $.ajax({
      url: 'https://publish.twitter.com/oembed?url=' + tweetUrl,
      dataType: 'jsonp',
      success: (response) => {
        return response;
      }
    });
    return this.getTwitterResponse ;
    // await this.http.get(`https://publish.twitter.com/oembed?url=${tweetUrl}`, {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //     'Access-Control-Allow-Headers': 'X-Requested-With,content-type,Access-Control-Allow-Origin',
    //     'Access-Control-Allow-Credentials': 'true',
    //     'x-frame-options': 'SAMEORIGIN'
    //   })
    // }).toPromise().then((response: TwitterData) => {
    //     this.getTwitterResponse = response.html;
    //   });
    // return this.getTwitterResponse;
}

}
