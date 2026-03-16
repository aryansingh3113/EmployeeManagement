import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // ─── Welcome ───
  userName = '';
  currentDate = new Date();

  // ─── Stats ───
  totalEmployees   = 0;
  totalDepartments = 0;
  newThisMonth     = 0;
  totalGenders     = { male: 0, female: 0, other: 0 };

  // ─── Employees ───
  allEmployees:    any[] = [];
  recentEmployees: any[] = [];

  // ─── Department breakdown ───
  departments: { name: string, count: number, percentage: number }[] = [];

  // ─── Search ───
  searchTerm    = '';
  searchResults: any[] = [];
  showResults   = false;

  // ─── Loading ───
  isLoading = true;

  constructor(
    private empService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userName = this.authService.getLoggedInUser();
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    this.empService.getEmployees().subscribe({
      next: (employees) => {
        this.allEmployees  = employees;
        this.totalEmployees = employees.length;

        // ─── Recent registrations (last 5) ───
        this.recentEmployees = [...employees].slice(-5).reverse();

        // ─── Unique departments ───
        const deptMap: { [key: string]: number } = {};
        employees.forEach(emp => {
          const dept = emp.business || 'Unknown';
          deptMap[dept] = (deptMap[dept] || 0) + 1;
        });
        this.totalDepartments = Object.keys(deptMap).length;
        this.departments = Object.keys(deptMap).map(name => ({
          name,
          count: deptMap[name],
          percentage: Math.round((deptMap[name] / this.totalEmployees) * 100)
        }));

        // ─── Gender ratio ───
        employees.forEach(emp => {
          const g = (emp.gender || '').toLowerCase();
          if      (g === 'male')   this.totalGenders.male++;
          else if (g === 'female') this.totalGenders.female++;
          else                     this.totalGenders.other++;
        });

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Dashboard load error:', err);
        this.isLoading = false;
      }
    });
  }

  // ─── Search ───
  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.searchResults = [];
      this.showResults   = false;
      return;
    }
    this.searchResults = this.allEmployees.filter(emp =>
      emp.name?.toLowerCase().includes(term)        ||
      emp.designation?.toLowerCase().includes(term) ||
      emp.business?.toLowerCase().includes(term)    ||
      emp.email?.toLowerCase().includes(term)
    );
    this.showResults = true;
  }

  onSelectEmployee(emp: any) {
    this.empService.setEmployeeForProfile(emp);
    this.searchTerm  = '';
    this.showResults = false;
    this.router.navigateByUrl('/Profile');
  }

  clearSearch() {
    this.searchTerm  = '';
    this.showResults = false;
  }

  // ─── Quick actions ───
  goTo(path: string) {
    this.router.navigateByUrl('/' + path);
  }

  // ─── Gender percentage helper ───
  genderPercent(count: number): number {
    if (this.totalEmployees === 0) return 0;
    return Math.round((count / this.totalEmployees) * 100);
  }
}