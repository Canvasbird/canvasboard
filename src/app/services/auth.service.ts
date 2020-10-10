import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signUpLoad = false;
  signUpReqObj;
  signUpResObj;

  loginLoad = false;
  loginReqObj;
  loginResObj;

  token = null;

  constructor(private http: HttpClient, public router: Router) {}

  login(): any {
    this.loginLoad = true;
    this.http
      .post(environment.apiHost + '/api/v1/login', this.loginReqObj)
      .subscribe(
        (res) => {
          console.log(res);
          this.loginResObj = res;
          localStorage.setItem('token', this.loginResObj.token);
          this.router.navigate(['/dashboard']);
          this.loginLoad = false;
        },
        (err) => {
          console.log(err);
          this.loginErrorAlert(err);
          this.loginLoad = false;
        }
      );
  }

  signUp(): any {
    this.signUpLoad = true;
    this.http
      .post(environment.apiHost + '/api/v1/register', this.signUpReqObj)
      .subscribe(
        (res) => {
          console.log(res);
          this.signUpResObj = res;
          Swal.fire({ icon: 'success', text: this.signUpResObj.message });
          this.router.navigate(['/login']);
          this.signUpLoad = false;
        },
        (err) => {
          console.log(err);
          Swal.fire({ icon: 'error', text: err.error.message });
          this.signUpLoad = false;
        }
      );
  }

  logout(): any {
    this.token = null;
    localStorage.setItem('token', null);
  }

  isUserLoggedIn() {
    // logic
    if (localStorage.getItem('token') !== null) {
      this.token = localStorage.getItem('token');
      return true;
    } else {
      return false;
    }
  }

  loginErrorAlert({ error }: ErrorEvent) {
    if (error.message === "Please verify your email-id") {
      Swal.fire({ icon: 'warning', text: "Please verify your email account for sign in" });
    } else if (error.message === "Incorrect password") {
      Swal.fire({ icon: 'error', text: "Incorrect username or password."});
    } else if (error.message === "User not found.") {
      Swal.fire({ 
        icon: 'warning',
        text: "This email address does not correspond to a registered account."
      });
    }
  }
}
