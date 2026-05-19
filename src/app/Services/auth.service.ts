import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private isLoggedIn = false;
  private loggedInUser = '';   // ← store username  

  constructor(private router: Router,
              private afAuth: AngularFireAuth //firebase auth 
  ) {}
  
  //login with firebase
  login(email: string, password: string): Promise<boolean> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.loggedInUser = result.user?.email || 'Admin';
        localStorage.setItem('isLoggedIn',   'true');
        localStorage.setItem('loggedInUser', this.loggedInUser);
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  logout() {
    this.afAuth.signOut();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/Login']);
  }

  isAuthenticated(): boolean {
    // Check memory first, then localStorage (for page refresh)
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  
  // ← Returns the logged in username
  getLoggedInUser(): string {
    return this.loggedInUser || localStorage.getItem('loggedInUser') || 'Admin';
  }
}