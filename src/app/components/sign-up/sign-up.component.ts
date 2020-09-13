import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  userName = '';
  instituteName = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signUp(): any {
    this.authService.signUpReqObj = {};
    this.authService.signUpReqObj.email_id = this.email;
    this.authService.signUpReqObj.password = this.password;
    this.authService.signUpReqObj.user_name = this.userName;
    this.authService.signUpReqObj.institute_name = this.instituteName;
    this.authService.signUp();
  }

}
