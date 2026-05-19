import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { ThemeService } from './Services/theme.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userName = '';
  isDark = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.userName = this.authService.getLoggedInUser();
    this.isDark   = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.isDarkMode();
  }

  isLoginPage(): boolean {
    return this.router.url === '/Login';
  }

  getInitial(): string {
    return this.userName.charAt(0).toUpperCase() || 'A';
  }

  onLogout() {
    this.authService.logout();
  }
}