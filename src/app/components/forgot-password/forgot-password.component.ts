import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private route: Router, private apiService: RestService) { }

  ngOnInit(): void {
  }

  async sendEmail() {
    const email: any = document.getElementById('email');
    const value = email.value;
    console.log(typeof value);

    const body = {
      email_id: value
    };

    const response: any = await this.apiService.sendEmailAddressForReset(body);
    console.log(response.success);

    if (response.success) {
      this.route.navigate([`/verify`]);
    }

  }
}
