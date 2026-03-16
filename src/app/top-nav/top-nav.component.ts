import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  userName = '';

  constructor(private authService: AuthService) {
    this.userName = this.authService.getLoggedInUser();
  }

  onLogout() {
    this.authService.logout();
  }
}