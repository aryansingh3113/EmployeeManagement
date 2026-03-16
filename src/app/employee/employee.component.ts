import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  isLoading = false;   // for loader

  constructor(private router: Router, private empService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
    
  }

  // ─── Fetch from Firebase ───
  loadEmployees() {
    this.isLoading = true;   // ← START loader
    this.empService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;   // ← STOP loader
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.isLoading = false;   // ← STOP loader even on error
      }
    });
  }

  onClick(emp: any) {
    this.empService.setEmployeeForProfile(emp);
    this.router.navigateByUrl('/Profile');
  }

  // ─── Delete from Firebase ───
  deleteEmp(event: Event, firebaseKey: string) {
    event.stopPropagation();
    if (confirm("Are you sure you want to delete this record?")) {
      this.empService.deleteEmployee(firebaseKey).subscribe({
        next: () => {
          this.loadEmployees();  // refresh table
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
        }
      });
    }
  }

  // ─── Go to edit form ───
  onClickEdit(event: Event, emp: any) {
    event.stopPropagation();
    this.empService.setEmployeeForEdit(emp);
    this.router.navigateByUrl('/Employee Registration');
  }
}