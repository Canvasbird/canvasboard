import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [ AuthService ]
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logoutButtonClick() {
    this.authService.logout()
    this.router.navigate(['/home/'])
  }
}
