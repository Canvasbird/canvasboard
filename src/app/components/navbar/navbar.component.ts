import { Component, Host, OnInit, Optional } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  bool: boolean;
  constructor(private authService: AuthService, private router: Router, private loc: Location) {
    this.bool = true;
  }

  ngOnInit() {
    if (this.authService.isUserLoggedIn()) {
       this.bool = false;
    }
  }

  logoutButtonClick() {
    this.authService.logout();
    this.router.navigate(['/home/']);
  }

  backButtonClick() {
    this.loc.back();
  }

  loginButtonClick() {
   this.router.navigate(['/login']);
  }
}
