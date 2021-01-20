import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {

  constructor(private apiService: RestService) { }

  ngOnInit(): void {
  }

  async sendDetails() {
    const codeid: any = document.getElementById('code');
    const codeValue = codeid.value;

    const newPassword: any = document.getElementById('renamePassword');
    const newPasswordValue = newPassword.value;

    const body = {
      reset_token: codeValue,
      password: newPasswordValue
    };

    const response: any = this.apiService.sendNewPasswordDetails(body);
    console.log(response);

    if (response.success) {
      Swal.fire({ icon: 'success', text: 'Something went wrong! Please try again. ' });
    }
  }
}
