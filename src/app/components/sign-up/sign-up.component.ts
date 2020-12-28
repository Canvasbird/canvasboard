import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  userName = '';
  email = '';
  password = '';
  hide = true;
  checksPassed = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signUp(): any {
    if (this.checksPassed === true) {
      this.authService.signUpReqObj = {};
      this.authService.signUpReqObj.email_id = this.email;
      this.authService.signUpReqObj.password = this.password;
      this.authService.signUpReqObj.user_name = this.userName;
      this.authService.signUp();
    } else {
      Swal.fire({ icon: 'error', text: 'Strong Password needed!' });
    }
  }

  onStrengthChanged(passStrength: number): void {
    if (passStrength === 100) {
      this.checksPassed = true;
    } else {
      this.checksPassed = false;
    }
  }

  ontoggle(): void {
    this.hide = !this.hide;
  }
}
