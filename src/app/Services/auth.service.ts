import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;
  private loggedInUser = '';   // ← store username  

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // For now, simple hardcoded check
    // Later I can connect this to Firebase Auth
    if (username === 'admin' && password === 'admin123') {
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');  // ← saves login state in browser
      localStorage.setItem('loggedInUser', username);   // ← save to localStorage too
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');          // ← clears login state
    this.router.navigate(['/Login']);
  }

  isAuthenticated(): boolean {
    // Check memory first, then localStorage (for page refresh)
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }
  
  // ← Returns the logged in username
  getLoggedInUser(): string {
    return this.loggedInUser || localStorage.getItem('loggedInUser') || 'Admin';
  }
}