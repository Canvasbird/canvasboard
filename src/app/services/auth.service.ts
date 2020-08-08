import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    console.log("Yeyy");

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      });
    let URL = "https://jsonplaceholder.typicode.com/posts"
    let body ={
      "userId": 1,
      "id": 7,
      "title": "MAGGIII POSTSSSSSS",
      "body": "I am making post"
      }

    let res = this.http.post(URL,body)
    res.subscribe((data)=> {
      console.log(data,"YEy!!");

    })
  }




  isUserLoggedIn(){
    //logic
    return true
  }
}
