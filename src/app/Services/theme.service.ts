import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDark = false;

  constructor() {
    // ← Remember user's preference on refresh
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.enableDark();
    }
  }

  toggleTheme() {
    if (this.isDark) {
      this.enableLight();
    } else {
      this.enableDark();
    }
  }

  enableDark() {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    this.isDark = true;
  }

  enableLight() {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    this.isDark = false;
  }

  isDarkMode(): boolean {
    return this.isDark;
  }
}