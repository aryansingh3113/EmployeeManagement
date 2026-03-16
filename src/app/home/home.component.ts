import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today       = new Date();
  userName    = '';
  isLoading   = true;

  // ─── Stats ───
  totalEmployees   = 0;
  totalDepartments = 0;
  maleCount        = 0;
  femaleCount      = 0;

  // ─── Employee of the month ───
  employeeOfMonth: any = null;

  // ─── Announcements ───
  announcements = [
    {
      title: 'System Maintenance',
      date: 'March 20, 2026',
      message: 'The portal will be down for maintenance on March 20th from 11 PM to 1 AM. Please save your work before that.',
      type: 'warning'
    },
    {
      title: 'New Leave Policy',
      date: 'March 15, 2026',
      message: 'Updated leave policy is now in effect. All employees are entitled to 2 additional sick leaves per quarter.',
      type: 'info'
    },
    {
      title: 'Q1 Appraisals',
      date: 'March 10, 2026',
      message: 'Q1 performance appraisals will begin from April 1st. Please ensure all your project reports are submitted.',
      type: 'success'
    }
  ];

  // ─── Recent Activity ───
  recentActivity = [
    { action: 'New employee registered',   user: 'Admin',       time: '2 hours ago',  icon: '➕' },
    { action: 'Employee record updated',   user: 'Admin',       time: '5 hours ago',  icon: '✏️' },
    { action: 'Employee profile viewed',   user: 'Admin',       time: '1 day ago',    icon: '👁️' },
    { action: 'Employee record deleted',   user: 'Admin',       time: '2 days ago',   icon: '🗑️' },
    { action: 'System login',              user: 'Admin',       time: '2 days ago',   icon: '🔐' },
  ];

  // ─── Motivational Quotes ───
  quotes = [
    { text: 'The secret of getting ahead is getting started.',          author: 'Mark Twain'         },
    { text: 'Coming together is a beginning, staying together is progress, and working together is success.', author: 'Henry Ford' },
    { text: 'Great things in business are never done by one person.',   author: 'Steve Jobs'         },
    { text: 'Success is not the key to happiness. Happiness is the key to success.', author: 'Albert Schweitzer' },
    { text: 'The only way to do great work is to love what you do.',    author: 'Steve Jobs'         },
    { text: 'Believe you can and you are halfway there.',               author: 'Theodore Roosevelt'  },
    { text: 'Your limitation — it is only your imagination.',           author: 'Unknown'             },
  ];
  todayQuote: any = {};

  constructor(
    private empService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName  = this.authService.getLoggedInUser();

    // Pick quote based on day of year so it changes daily
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    this.todayQuote = this.quotes[dayOfYear % this.quotes.length];

    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.empService.getEmployees().subscribe({
      next: (employees) => {
        this.totalEmployees = employees.length;

        // Unique departments
        const depts = new Set(employees.map(e => e.business).filter(Boolean));
        this.totalDepartments = depts.size;

        // Gender counts
        this.maleCount   = employees.filter(e => e.gender?.toLowerCase() === 'male').length;
        this.femaleCount = employees.filter(e => e.gender?.toLowerCase() === 'female').length;

        // Employee of the month — pick one with most experience
        if (employees.length > 0) {
          this.employeeOfMonth = employees.reduce((prev, curr) =>
            (curr.yearExp > prev.yearExp ? curr : prev)
          );
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Home load error:', err);
        this.isLoading = false;
      }
    });
  }

  goTo(path: string) {
    this.router.navigateByUrl('/' + path);
  }

  getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}
}