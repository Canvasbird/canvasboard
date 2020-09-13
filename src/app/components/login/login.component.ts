import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailId = '';
  password = '';

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  login(): any {
    this.authService.loginReqObj  = {};
    this.authService.loginReqObj.email_id = this.emailId;
    this.authService.loginReqObj.password = this.password;
    this.authService.login();
  }

}
