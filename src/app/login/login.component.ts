import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg = '';
  showPassword = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.minLength(3)]),        // ← at least 3 characters
      password: new FormControl('', [Validators.required,Validators.minLength(6)])        // ← at least 6 characters
    });
  }

  // ─── Shortcut getters so HTML can access fields easily ───
  get username() { 
    return this.loginForm.get('username'); 
  }
  get password() { 
    return this.loginForm.get('password'); 
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    // Mark all fields as touched so errors show up on submit
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    const success = this.authService.login(username, password);

    if (success) {
      this.router.navigate(['/Dashboard']);
    } else {
      this.errorMsg = 'Invalid username or password.';
    }
    this.loginForm.reset();
  }
}