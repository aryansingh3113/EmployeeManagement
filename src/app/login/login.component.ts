import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { ThemeService } from '../Services/theme.service';  // ← add this

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg     = '';
  showPassword = false;
  isDark       = false;   // ← add this

  constructor(
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService   // ← add this
  ) {}

  ngOnInit() {
    // ← read current theme state when page loads
    this.isDark = this.themeService.isDarkMode();

    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // ← add this method
  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.isDarkMode();
  }

  onLogin() {
  this.loginForm.markAllAsTouched();
  if (this.loginForm.invalid) return;

  const { username, password } = this.loginForm.value;

  // ← Promise based now
  this.authService.login(username, password).then(success => {
    if (success) {
      this.router.navigate(['/Dashboard']);
    } else {
      this.errorMsg = 'Invalid email or password.';
    }
  });
}
}