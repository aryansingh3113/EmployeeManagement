import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';
import { DialogService } from '../Services/dialog.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  isLoading = false;   // for loader
  activatedRoute : ActivatedRoute = inject(ActivatedRoute);
  serachString : string;

  constructor(private router: Router, private empService: EmployeeService, private dialogService: DialogService ) {}

  ngOnInit() {
    this.loadEmployees();
    this.serachString = this.activatedRoute.snapshot.queryParamMap.get('search')
    console.log(this.serachString);
    
    
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
        this.dialogService.error('Failed to load employees.');
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

    // ← MatDialog instead of window.confirm
    this.dialogService.confirm(
      'Delete Employee',
      'Are you sure you want to permanently delete this record? This action cannot be undone.',
      'Delete',
      'Cancel',
      'danger'
    ).subscribe(confirmed => {
      if (confirmed) {
        this.empService.deleteEmployee(firebaseKey).subscribe({
          next: () => {
            this.dialogService.success('Employee deleted successfully.');
            this.loadEmployees();
          },
          error: () => {
            this.dialogService.error('Failed to delete employee.');
          }
        });
      }
    });
  }

  // ─── Go to edit form ───
  onClickEdit(event: Event, emp: any) {
    event.stopPropagation();
    this.empService.setEmployeeForEdit(emp);
    this.router.navigateByUrl('/Employee Registration');
  }
}